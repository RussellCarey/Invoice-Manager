import { SHOW_EDIT_WINDOW, SHOW_NEW_WINDOW } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SHOW_NEW_WINDOW:
      return {
        ...state,
        showNewWindow: action.payload,
      };

    default:
      return state;
  }
};
