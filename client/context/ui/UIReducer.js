import {
  SHOW_INVOICE_WINDOW,
  SHOW_MODAL,
  SHOW_SPINNER,
  SET_TYPE,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case SHOW_INVOICE_WINDOW:
      return {
        ...state,
        showWindow: action.payload,
      };
    case SHOW_MODAL:
      return {
        ...state,
        showModal: action.payload,
      };
    case SHOW_SPINNER:
      return {
        ...state,
        showModal: action.payload,
      };
    case SET_TYPE:
      return {
        ...state,
        showType: action.payload,
      };

    default:
      return state;
  }
};
