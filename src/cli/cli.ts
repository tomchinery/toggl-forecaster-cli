import { getConfig } from '../config';
import { togglAuthenticate, togglGetProfile, jiraGetAccessCode, jiraAuthenticateErrorHandler, jiraResourceErrorHandler, jiraGetCloudId } from '../api';
import { TogglGrantTypes, JiraGrantTypes } from '../enums';
import { TogglTokenResponse, TogglProfileResponse, JiraSitesResponse, JiraTokenResponse } from '../types';
import { togglErrorHandler, jiraOAuthErrorHandler } from '../api';
import { jiraAuthenticate } from '../api';
import { Constants } from '../constants';

interface CLIArgs { }

export async function cli(args: CLIArgs): Promise<void> {
  // get configuration object
  const config = await getConfig();

  // check environment variables are set
  // @TODO(config): await checkEnvironmentVariables();

  // Authenticate with Jira, Toggl, and Timetastic

  // get jira access code
  const jiraAccessCode = await jiraOAuthErrorHandler(jiraGetAccessCode());

  // authenticate jira clients
  await jiraAuthenticateErrorHandler(await jiraAuthenticate({
    grant_type: JiraGrantTypes.AuthorizationCode,
    client_id: Constants.JiraClientId,
    client_secret: Constants.JiraClientSecret,
    code: jiraAccessCode,
    redirect_uri: Constants.JiraCallbackUrl
  }));

  // get jira sites
  const sites = await jiraResourceErrorHandler(await jiraGetCloudId());

  console.log(sites);


  // const togglAuthenticationRequest: TogglTokenResponse = togglErrorHandler(await togglAuthenticate({
  //   grant_type: TogglGrantTypes.Password,
  //   username: config.toggl.username,
  //   password: config.toggl.password
  // }));

  // const togglProfileRequest: TogglProfileResponse = togglErrorHandler(await togglGetProfile());
}
