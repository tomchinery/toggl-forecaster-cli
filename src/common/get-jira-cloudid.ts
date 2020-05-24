import { jiraResourceErrorHandler, jiraGetSites } from "../api";
import { JiraSitesResponse } from "../types";
import { Config } from "../interfaces";

export async function getJiraCloudId(config: Config) {
  const sites: JiraSitesResponse = await jiraResourceErrorHandler(await jiraGetSites());

  const site = await sites.find((site) => site.name === config.jira.site);

  if (!site) {
    console.error('JiraConfigurationError: Jira Site does not exist. Please check your configuration.');
    process.exit();
  }

  return site!.id;
}
