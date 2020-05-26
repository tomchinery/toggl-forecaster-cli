export interface Config {
  toggl: {
    username: string;
    password: string;
  },
  jira: {
    site: string;
    project: string;
  },
  sprintStartEndDay: string;
  startDate: string;
}
