import { hasJiraResourceError } from "../../type-guards";

export function jiraResourceErrorHandler(request: any): any {
  if (hasJiraResourceError(request)) {
    console.error(`JiraOAuthAPIError: ${request.code} ${request.messsage}`);
    process.exit();
  }

  return request;
}
