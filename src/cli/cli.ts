import { getConfig } from '../config';
import { togglAuthenticate, togglGetProfile, jiraGetAccessCode, jiraAuthenticateErrorHandler, jiraResourceErrorHandler, authenticateApis, jiraGetSites } from '../api';
import { TogglGrantTypes, JiraGrantTypes } from '../enums';
import { TogglTokenResponse, TogglProfileResponse, JiraSitesResponse, JiraTokenResponse } from '../types';
import { togglErrorHandler, jiraOAuthErrorHandler } from '../api';
import { jiraAuthenticate } from '../api';
import { Constants } from '../constants';
import { getJiraCloudId } from '../common';

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

  console.log(cloudid);

  // const togglProfileRequest: TogglProfileResponse = togglErrorHandler(await togglGetProfile());
}
