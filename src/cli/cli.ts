import { getConfig } from '../config';
import { togglAuthenticate, togglGetProfile, jiraGetAccessCode, jiraAuthenticateErrorHandler, jiraResourceErrorHandler, authenticateApis, jiraGetSites, jiraGetUsersByProject, togglCreateProject, jiraSearchIssuesByProject, togglCreateTask } from '../api';
import { TogglGrantTypes, JiraGrantTypes } from '../enums';
import { TogglTokenResponse, TogglProfileResponse, JiraSitesResponse, JiraTokenResponse } from '../types';
import { togglErrorHandler, jiraOAuthErrorHandler } from '../api';
import { jiraAuthenticate } from '../api';
import { Constants } from '../constants';
import { getJiraCloudId } from '../common';
import { togglCreateSegment } from '../api/toggl/create-segment';

import { addBusinessDays, format, subBusinessDays } from 'date-fns';
import { parseFromTimeZone } from 'date-fns-timezone';

interface CLIArgs { }

export async function cli(args: CLIArgs): Promise<void> {
  // get configuration object
  const config = await getConfig();

  // check environment variables are set
  // @TODO(config): await checkEnvironmentVariables();

  // Authenticate with Jira, Toggl, and Timetastic
  await authenticateApis(config);

  // get jira cloudid
  const cloudid = await getJiraCloudId(config);

  // get jira project
  // @TODO(project): check that jira project exists

  // get jira users assignable to the configured project
  // @TODO: add error handler
  const users = await jiraGetUsersByProject(cloudid, config.jira.project);

  // get backlog issues for the configured project
  // @TODO: add error handler
  const issueRequest = await jiraSearchIssuesByProject(
    cloudid,
    config.jira.project,
    '+AND+issuetype+in+standardIssueTypes()+AND+issuetype+!=+Epic+AND+status+not+in+(Done,+Closed)+AND+sprint+is+EMPTY+order+by+rank'
  );

  // get toggl profile for workspace id
  const togglProfileRequest: TogglProfileResponse = togglErrorHandler(await togglGetProfile());

  // create toggl plan
  // @TODO: add error handler
  const plan = togglErrorHandler(await togglCreateProject({
    name: "Test Plan 2",
    color: "#8392ae"
  }, togglProfileRequest.workspaces[0].id));

  // for each user filter issues into a new array
  const usersWithIssues: any[] = await Promise.all(users.values.map(async (user: any) => {
    const userIssues = issueRequest.issues.filter((issue: any) => {
      if (issue.fields.assignee) {
        return issue.fields.assignee.displayName === user.displayName;
      }

      return false;
    });

    // create user segment in toggl
    const segment = togglErrorHandler(await togglCreateSegment(
      {
        name: user.displayName
      },
      togglProfileRequest.workspaces[0].id,
      plan.id
    ));

    return {
      name: user.displayName,
      issues: userIssues,
      segment_id: segment.id
    }
  }));

  const startDate = parseFromTimeZone(config.startDate, { timeZone: 'Europe/London' });

  // const task = togglErrorHandler(await togglCreateTask(
  //   {
  //     name: 'TESTING TASK',
  //     start_date: parseFromTimeZone(startDate.toISOString(), { timeZone: 'Europe/London' }).toISOString(),
  //     end_date: addBusinessDays(startDate, 1).toISOString(),
  //     color: '#a8ced7',
  //     project_id: plan.id,
  //     project_segment_id: usersWithIssues[0].segment_id
  //   },
  //   togglProfileRequest.workspaces[0].id,
  // ));

  // map each user array calculating start and dates of each issue
  for (const user of usersWithIssues) {
    let userStartDate = startDate;
    // @TODO: make this configurable
    let secondsLeftInDay = 28800; // 8 hours

    const tasks = await Promise.all(user.issues.map(async (issue: any) => {
      const estimate = issue.fields.timeestimate;
      const daysToAdd = Math.ceil(estimate / 28800);
      const startDate = userStartDate;
      let endDate = addBusinessDays(startDate, daysToAdd);

      // update starting values
      secondsLeftInDay = estimate % 28800;

      userStartDate = addBusinessDays(endDate, 1);

      // create the toggl task
      const task = togglErrorHandler(await togglCreateTask(
        {
          name: issue.fields.summary,
          start_date: format(startDate, 'yyyy-MM-dd'),
          end_date: format(endDate, 'yyyy-MM-dd'),
          color: '#a8ced7',
          project_id: plan.id,
          project_segment_id: user.segment_id
        },
        togglProfileRequest.workspaces[0].id,
      ));

      return {
        name: issue.fields.summary,
        start_date: format(startDate, 'yyyy-MM-dd'),
        end_date: format(startDate, 'yyyy-MM-dd'),
        color: '#a8ced7',
        project_id: plan.id,
        project_segment_id: user.segment_id
      }
    }));

    console.log(tasks[0]);
  }

  // create tasks for each issue in toggl

  // handle sprint milestones
}
