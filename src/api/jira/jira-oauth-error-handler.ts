export async function jiraOAuthErrorHandler(request: Promise<any>): Promise<any> {
  request.catch((e) => {
    console.error(e);
    process.exit();
  });

  return await request;
}
