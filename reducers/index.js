import * as types from "../types";

export const queries = (state = {}, action) => {
  switch (action.type) {
    case "SET_QUERY_DATA":
      return { ...state, [action.operation]: { ...state[action.operation], ...action.refinedState } };
      break;
    default:
      return state;
      break;
  }
}