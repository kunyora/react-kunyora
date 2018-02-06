import * as types from "../types";

export const queries = (state = {}, action) => {
  switch (action.type) {
    case "SET_QUERY_DATA":
      return {
        ...state,
        [action.operation]: {
          ...state[action.operation],
          ...action.refinedState
        }
      };
      break;
    default:
      return state;
      break;
  }
};

export const requestHeader = (
  state = { id: Date.now(), options: {} },
  action
) => {
  switch (action.type) {
    case types.COMPOSER_SET_REQUEST_HEADER:
      return { ...state, id: Date.now(), options: action.request.options };
      break;
    default:
      return state;
  }
};
