import { jiraApiClient } from "./client";
import { AxiosError } from "axios";

// @TODO: add generic types
export async function jiraSearchIssuesByProject(cloudid: string, project: string, search: string) {
  try {
    const response = await jiraApiClient.get<any>(
      `${cloudid}//rest/api/3/search?jql=project=${project}${search}&maxResults=100`
    );

    return response.data;
  } catch (error) {
    if (error & error.response) {
      const axiosError = error as AxiosError<any>;
      return axiosError.response!.data;
    }

    console.log(error.response.data);

    throw error;
  }
}
