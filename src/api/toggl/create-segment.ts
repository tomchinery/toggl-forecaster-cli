import { togglApiClient } from "./client";
import { AxiosError } from "axios";

// @TODO: add generic types
export async function togglCreateSegment(segment: any, workspace_id: number, project_id: number) {
  try {
    const response = await togglApiClient.post<any>(`/${workspace_id}/projects/${project_id}/segments`, segment);
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<any>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
