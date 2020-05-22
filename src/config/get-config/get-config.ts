import * as os from 'os';
import * as fs from 'fs';
const { readFile } = fs.promises;

import { Config } from '../../interfaces';

// gets and validates the config object in the home directory of the user
// ~/.toggl-forecaster-config
export async function getConfig(): Promise<Config> {
  const homedir = os.homedir();
  let config;

  try {
    config = await readFile(`${homedir}/.toggl-forecaster-config`);
    config = await config.toString();
  } catch (e) {
    config = "{}";
    console.log('No config file present, please create one in your home directory; `touch ~/.toggl-forecaster-config`.');
  }

  return JSON.parse(config);
}
