import { jiraOAuthErrorHandler } from "./jira/jira-oauth-error-handler";
import { jiraGetAccessCode } from "./jira/get-access-code";
import { jiraAuthenticate } from "./jira/authenticate";
import { jiraAuthenticateErrorHandler } from "./jira/jira-authenticate-error-handler";
import { JiraGrantTypes, TogglGrantTypes } from "../enums";
import { Constants } from "../constants";
import { togglErrorHandler } from "./toggl/toggl-error-handler";
import { togglAuthenticate } from "./toggl/authenticate";
import { Config } from "../interfaces";

export async function authenticateApis(config: Config): Promise<void> {
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

  // authenticate toggl clients
  await togglErrorHandler(await togglAuthenticate({
    grant_type: TogglGrantTypes.Password,
    username: config.toggl.username,
    password: config.toggl.password
  }));
}
