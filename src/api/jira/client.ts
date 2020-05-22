import axios from 'axios';
import { ApiBaseUrls } from '../../enums';

export const jiraApiClient = axios.create({
  baseURL: ApiBaseUrls.JiraCloudBaseUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});

export const jiraOAuthClient = axios.create({
  baseURL: ApiBaseUrls.JiraOAuthUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});
