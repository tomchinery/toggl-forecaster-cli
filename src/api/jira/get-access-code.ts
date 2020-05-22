import * as express from "express";

export async function jiraGetAccessCode() {
  const oAuthApp = express();
  const port = 1111;
  let server: any;

  const accessCodePromise = await new Promise((resolve, reject) => {
    oAuthApp.get('/jira/oauth2/callback', function(req, res) {
      resolve(req.query.code);
      res.send('POST request to the oauth handler');
    });

    server = oAuthApp.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));
  });

  await server!.close();

  return accessCodePromise;
}
