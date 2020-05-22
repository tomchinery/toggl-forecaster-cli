# # `@tomchinery/toggl-forecaster-cli`

> A CLI tool that generates a Toggl Plan project forecast using a Jira backlog and Timetastic holidays

## Summary

This tool is a CLI that will create a new Toggl "Plan" based on your current Jira Backlog. 

*Note: due to the complexity of working out differences in start and end date the tool only supports creation of a new "Plan" and cannot update an existing "Plan".*

It will:

### [MVP] Migrate Assigned Users to Segments
- All assigned users are collected from the backlog
- Checks if the "plan" contains a Segment for each user. If not it will create one.

### [MVP] Migrate Versions, Epics, and Components to Tags:
- All Versions are collected from the backlog
- All Epics are collected from the backlog
- All Components are collected from the backlog
- Checks if the "plan" contains a Tag for each Version, Epic and Component. If not it will create one.

### [MVP] Migrate Issues to Tasks
- All issues are collected from the backlog in priority order and grouped by assignee
- It will then process all the issues for an assignee generating:
  - Start / End Dates from estimates in sequential order based on available work hours for a given day
  - Associated Tags for the task
  - Link to the Jira Issue within the Task description
  - Subtasks added as ToDo's 
  
### [MVP] Migrate Sprints to Milestones
- Sprints are generated based on a bi-weekly cycle on a specific day

### [MVP 1.1] Migrate Public Holidays to Milestones

### [MVP 1.1] Migrate Team Holidays to Milestones

### [MVP 1.1] Migrate Assignees to Users (max 5 for free plan teams)
  
## Installation

Install via npm:
```bash
npm install -g @tomchinery/toggl-forecaster-cli
```

Set some environment variables:
```bash
export TOGGL_CLIENT_ID=<your_client_id>;
export TOGGL_CLIENT_SECRET=<your_client_secret>;
```

Create a configuration file in your home directory:
```bash
touch ~/.toggl-forecaster-config
```

## Configuration

The `.toggl-forecaster-config` file contains the following object:

```json
  toggl: {
    username: string;
    password: string;
  }
  sprintStartEndDay: string;
```

##### Toggl
**username**

- Your Toggl Username

**password**

- Your Toggl Password

##### CLI Specific

**sprintStartEndDay**

- The day your sprint starts

## Jira Guidelines

@TODO: Write up public Jira guidelines document

- Do not estimate lower than 4 hours
  - Product Managers don't need anything more granular than this
- Use Versions, Epics, and Components
  - Versions are for tracking your MVP's
  - Epics are for tracking your specific Features
  - Components are for tracking any areas that need team visibility or review
- Assign every issue
  - Without an owner it won't get done
- Only estimate top-level stories, tasks, or defects
  - anything more granular likely means your team will be inefficient / too much admin work

## 
