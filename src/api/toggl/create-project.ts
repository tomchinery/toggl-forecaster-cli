import { togglApiClient } from "./client";
import { AxiosError } from "axios";

// @TODO: add generic types
export async function togglCreateProject(project: any, workspace_id: number) {
  try {
    const response = await togglApiClient.post<any>(`/${workspace_id}/projects`, project);
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<any>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
