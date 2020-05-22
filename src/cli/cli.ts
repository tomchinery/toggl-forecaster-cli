import { getConfig } from '../config';

interface CLIArgs { }

export async function cli(args: CLIArgs): Promise<void> {
  // call another function here
  const config = await getConfig();
  console.log(config);
}
