import { JiraResourceError } from "../types";

export function hasJiraResourceError(jiraRequest: any): jiraRequest is JiraResourceError {
  return (jiraRequest as JiraResourceError).code !== undefined;
}
