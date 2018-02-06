import * as types from "../types";

export const setQuery = (operation, refinedState) => ({
  type: types.SET_QUERY_DATA,
  operation,
  refinedState
});

export const sendRequestHeaderCommand = request => ({
  type: types.COMPOSER_SEND_REQUEST_HEADER_CMD,
  _reqObj: { options: request }
});

export const sendResponseToMiddleware = response => ({
  type: types.COMPOSER_SEND_RESPONSE_TO_MIDDLEWARE,
  response
});
