import { TogglBadRequestError } from '../types';

export function isTogglBadRequest(togglError: any): togglError is TogglBadRequestError {
  return (togglError as TogglBadRequestError).error !== undefined;
}
