import { hasJiraOAuthError } from "../../type-guards";

export function jiraAuthenticateErrorHandler(request: any): any {
  if (hasJiraOAuthError(request)) {
    console.error(`JiraOAuthAPIError: ${request.error}`);
    process.exit();
  }

  return request;
}
