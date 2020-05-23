import { JiraOAuthError } from "../types";

export function hasJiraOAuthError(jiraRequest: any): jiraRequest is JiraOAuthError {
  return (jiraRequest as JiraOAuthError).error !== undefined;
}
