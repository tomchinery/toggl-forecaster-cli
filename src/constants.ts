export const Constants = {
  TogglClientId: process.env.TOGGL_CLIENT_ID || '',
  TogglClientSecret: process.env.TOGGL_CLIENT_SECRET || '',
  JiraClientId: process.env.JIRA_CLIENT_ID || '',
  JiraClientSecret: process.env.JIRA_CLIENT_SECRET || '',
  JiraCallbackUrl: 'http://localhost:1111/jira/oauth2/callback'
}
