import { AxiosError } from 'axios';
import { togglApiClient } from './client';
import { TogglServerError } from '../../types';
import { TogglProfileResponse } from '../../types';

export async function togglGetProfile() {
  try {
    const response = await togglApiClient.get<TogglProfileResponse>('/me');
    return response.data;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<TogglServerError>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
