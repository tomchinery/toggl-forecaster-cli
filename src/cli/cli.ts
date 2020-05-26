import { getConfig } from '../config';
import { togglAuthenticate, togglGetProfile, jiraGetAccessCode, jiraAuthenticateErrorHandler, jiraResourceErrorHandler, authenticateApis, jiraGetSites, jiraGetUsersByProject, togglCreateProject, jiraSearchIssuesByProject } from '../api';
import { TogglGrantTypes, JiraGrantTypes } from '../enums';
import { TogglTokenResponse, TogglProfileResponse, JiraSitesResponse, JiraTokenResponse } from '../types';
import { togglErrorHandler, jiraOAuthErrorHandler } from '../api';
import { jiraAuthenticate } from '../api';
import { Constants } from '../constants';
import { getJiraCloudId } from '../common';
import { togglCreateSegment } from '../api/toggl/create-segment';

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
  const issues = await jiraSearchIssuesByProject(
    cloudid,
    config.jira.project,
    '+AND+issuetype+in+standardIssueTypes()+AND+issuetype+!=+Epic+AND+status+not+in+(Done,+Closed)+AND+sprint+is+EMPTY+order+by+rank'
  );

  console.log(issues);

  // map through the backlogged issues transforming into a smaller object

  // for each user filter issues into a new array
  // map each user array calculating start and dates

  // get toggl profile for workspace id
  // const togglProfileRequest: TogglProfileResponse = togglErrorHandler(await togglGetProfile());

  // create toggl plan
  // @TODO: add error handler
  // const plan = togglErrorHandler(await togglCreateProject({
  //   name: "Test Plan 2",
  //   color: "#8392ae"
  // }, togglProfileRequest.workspaces[0].id));

  // create segments for each user in toggl
  // const segments = await Promise.all(users.values.map(async (user: any) => {
  //   const segment = togglErrorHandler(await togglCreateSegment(
  //     {
  //       name: user.displayName
  //     },
  //     togglProfileRequest.workspaces[0].id,
  //     plan.id
  //   ));

  //   return segment;
  // }));

  // create tasks for each issue in toggl

  // handle sprint milestones
}
