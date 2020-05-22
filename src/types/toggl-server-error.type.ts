import { TogglBadRequestError } from "./toggl-bad-request-error.type";
import { TogglUnprocessableEntityError } from "./toggl-unprocessable-entity-error.type";

export type TogglServerError = TogglBadRequestError | TogglUnprocessableEntityError;

