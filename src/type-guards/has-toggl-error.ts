import { TogglServerError } from '../types';
import { isTogglBadRequest } from './is-toggl-bad-request';
import { isTogglUnprocessableEntity } from './is-toggl-unprocessable-entity';

export function hasTogglError(togglRequest: any): togglRequest is TogglServerError {
  if (isTogglBadRequest(togglRequest) || isTogglUnprocessableEntity(togglRequest)) {
    return true;
  }

  return false;
}
