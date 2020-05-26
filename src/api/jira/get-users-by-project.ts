import { AxiosError } from "axios";
import { jiraApiClient } from "./client";

// @TODO: add generic types
export async function jiraGetUsersByProject(cloudid: string, project: string) {
  try {
    const response = await jiraApiClient.get<any>(
      `${cloudid}/rest/api/3/user/search/query`, {
        params: {
          query: `is assignee of ${project}`
        }
      }
    );

    return response.data;
  } catch (error) {
    if (error & error.response) {
      const axiosError = error as AxiosError<any>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
