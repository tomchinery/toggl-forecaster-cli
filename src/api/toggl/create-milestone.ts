import { togglApiClient } from "./client";
import { AxiosError } from "axios";

// @TODO: add generic types
export async function togglCreateMilestone(milestone: any, workspace_id: number) {
  try {
    const response = await togglApiClient.post<any>(`/${workspace_id}/milestones`, milestone);
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<any>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
