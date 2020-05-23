import * as express from 'express';
import * as open from 'open';
import { uuid } from 'uuidv4';

export async function jiraGetAccessCode() {
  const oAuthApp = express();
  const port = 1111;
  const userState = uuid();
  let server: any;

  const accessCodePromise = await new Promise((resolve, reject) => {
    oAuthApp.get('/jira/oauth2/callback', function(req, res) {
      if (req.query.state === userState) {
        resolve(req.query.code);
        res.send('Successfully authenticated with Jira API.');
      } else {
        reject('Could not authenticate with Jira API. Please try again.');
        res.send('Could not authenticate with Jira API. Please try again.');
      }
    });

    server = oAuthApp.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

    open(`https://auth.atlassian.com/authorize?audience=api.atlassian.com&client_id=YTao5eBZrpzZ9Yp3vaXpmXvF14XZB8Fn&scope=read%3Ajira-user%20read%3Ajira-work&redirect_uri=http%3A%2F%2Flocalhost%3A1111%2Fjira%2Foauth2%2Fcallback&state=${userState}&response_type=code&prompt=consent`);
  });

  await server!.close();

  return accessCodePromise;
}
