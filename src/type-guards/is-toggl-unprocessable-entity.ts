import { TogglUnprocessableEntityError } from '../types';

export function isTogglUnprocessableEntity(togglError: any): togglError is TogglUnprocessableEntityError {
  return (togglError as TogglUnprocessableEntityError).errors !== undefined;
}
