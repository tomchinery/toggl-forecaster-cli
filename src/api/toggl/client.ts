import axios from 'axios';
import { ApiBaseUrls } from '../../enums';

export const togglApiClient = axios.create({
  baseURL: ApiBaseUrls.TogglBaseUrl,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json'
  }
});
