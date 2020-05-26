import { togglApiClient } from "./client";
import { AxiosError } from "axios";

// @TODO: add generic types
export async function togglCreateTask(task: any, workspace_id: number) {
  try {
    const response = await togglApiClient.post<any>(`/${workspace_id}/tasks`, task);
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<any>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
