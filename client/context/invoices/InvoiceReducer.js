import { SET_ALL_INVOICES, ADD_ITEM_ROW, SET_CURRENT_INVOICE, SET_ORIGINAL_INVOICES } from "../types";

export default (state, action) => {
  switch (action.type) {
    case SET_ALL_INVOICES:
      return {
        ...state,
        allInvoices: action.payload,
      };
    case SET_ORIGINAL_INVOICES:
      return {
        ...state,
        invoiceData: action.payload,
      };
    case SET_CURRENT_INVOICE:
      return {
        ...state,
        currentInvoice: action.payload,
      };

    default:
      return state;
  }
};
