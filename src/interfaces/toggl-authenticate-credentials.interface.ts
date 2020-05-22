import { TogglGrantTypes } from '../enums';

export interface TogglAuthenticateCredentials {
  grant_type: TogglGrantTypes;
  username: string;
  password: string;
}
