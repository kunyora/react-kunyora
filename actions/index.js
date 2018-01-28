import * as types from "../types";

export const setQuery = (operation, refinedState) => ({
  type: types.SET_QUERY_DATA,
  operation,
  refinedState
})