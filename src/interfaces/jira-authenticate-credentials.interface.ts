import { JiraGrantTypes } from "../enums";

export interface JiraAuthenticateCredentials {
  grant_type: JiraGrantTypes;
  client_id: string;
  client_secret: string;
  code: string;
  redirect_uri: string;
}
