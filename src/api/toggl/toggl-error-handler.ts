import {
  hasTogglError,
  isTogglBadRequest,
  isTogglUnprocessableEntity
} from '../../type-guards';

export function togglErrorHandler(request: any): any {
  if (hasTogglError(request)) {
    if (isTogglBadRequest(request)) {
      console.error(`TogglAPIError: ${request.error}`);
    }

    if (isTogglUnprocessableEntity(request)) {
      console.error(`TogglAPIError: ${request.errors}`);
    }

    process.exit();
  }

  return request;
}
