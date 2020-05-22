import { getConfig } from '../config';
import { togglAuthenticate, togglGetProfile } from '../api';
import { TogglGrantTypes } from '../enums';
import { TogglTokenResponse, TogglProfileResponse } from '../types';
import { togglErrorHandler } from '../api';

interface CLIArgs { }

export async function cli(args: CLIArgs): Promise<void> {
  // get configuration object
  const config = await getConfig();

  // check environment variables are set
  // @TODO(config): await checkEnvironmentVariables();

  // call sub-command method

  // rip into sub-command methods via commander?
  const togglAuthenticationRequest: TogglTokenResponse = togglErrorHandler(await togglAuthenticate({
    grant_type: TogglGrantTypes.Password,
    username: config.toggl.username,
    password: config.toggl.password
  }));

  const togglProfileRequest: TogglProfileResponse = togglErrorHandler(await togglGetProfile());

  console.log(togglProfileRequest);
}
