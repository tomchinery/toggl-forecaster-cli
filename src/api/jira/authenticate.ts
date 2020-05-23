import { AxiosError } from 'axios';
import { jiraOAuthClient, jiraApiClient, jiraResourcesClient } from './client';
import { JiraAuthenticateCredentials } from '../../interfaces';
import { JiraOAuthError, JiraTokenResponse } from '../../types';

export async function jiraAuthenticate(credentials: JiraAuthenticateCredentials) {
  try {
    const response = await jiraOAuthClient.post<JiraTokenResponse>('/', credentials);

    const jiraTokenResponse = response.data;

    // set default authorization header for jiraApiClient
    jiraApiClient.defaults.headers.common['Authorization'] = `Bearer ${jiraTokenResponse.access_token}`;

    // set default authorization header for jiraResourcesClient
    jiraResourcesClient.defaults.headers.common['Authorization'] = `Bearer ${jiraTokenResponse.access_token}`;

    return response.data;
  } catch (error) {
    if (error & error.response) {
      const axiosError = error as AxiosError<JiraOAuthError>;
      return axiosError.response!.data;
    }

    throw error;
  }
}
