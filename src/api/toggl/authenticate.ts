import { AxiosError } from 'axios';
import { togglApiClient } from './client';
import { TogglServerError } from '../../types';
import { TogglAuthenticateCredentials } from '../../interfaces';
import { TogglTokenResponse } from '../../types';
import { Constants } from '../../constants';

export async function togglAuthenticate(credentials: TogglAuthenticateCredentials) {
  try {
    const response = await togglApiClient.post<TogglTokenResponse>('/authenticate/token', credentials, {
      auth: {
        username: Constants.TogglClientId,
        password: Constants.TogglClientSecret
      }
    });

    const togglTokenResponse = response.data;

    // set default authorization header for togglApiClient
    togglApiClient.defaults.headers.common['Authorization'] = `Bearer ${togglTokenResponse.access_token}`;

    return response.data;
  } catch (error) {
    if (error && error.response) {
      const axiosError = error as AxiosError<TogglServerError>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
