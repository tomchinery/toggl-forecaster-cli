import { jiraResourcesClient } from "./client";
import { AxiosError } from "axios";
import { JiraSitesResponse, JiraResourceError } from "../../types";

export async function jiraGetSites() {
  try {
    const response = await jiraResourcesClient.get<JiraSitesResponse>('');

    return response.data;
  } catch (error) {
    if (error & error.response) {
      const axiosError = error as AxiosError<JiraResourceError>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
