import { SET_ALL_INVOICES, SET_CURRENT_INVOICE, SET_ORIGINAL_INVOICES } from "../types";

import React, { useReducer, useContext } from "react";

import InvoiceContext from "./InvoiceContext";
import InvoiceReducer from "./InvoiceReducer";

import axios from "axios";

const InvoiceState = (props) => {
  const initialState = {
    invoiceData: [],
    currentInvoice: { items: [] },
    allInvoices: [],
  };

  const [invoiceState, dispatch] = useReducer(InvoiceReducer, initialState);

  const setCurrentInvoice = (invoice) => {
    dispatch({
      type: SET_CURRENT_INVOICE,
      payload: invoice,
    });
  };

  // Get all invoice
  const getAllInvoices = async () => {
    const req = await axios.get("http://localhost:2222/api/data/invoices");

    dispatch({
      type: SET_ALL_INVOICES,
      payload: req.data.data,
    });

    dispatch({
      type: SET_ORIGINAL_INVOICES,
      payload: req.data.data,
    });

    console.log(req.data.data);
    return req.data.data;
  };

  // Delete invoice from the db
  const deleteInvoice = async (id) => {
    const req = await axios.delete(`http://localhost:2222/api/data/invoice/${id}`);
  };

  // Update database invoice
  const updateInvoice = async (invoice) => {
    const req = await axios.patch(`http://localhost:2222/api/data/invoice/${invoice.invoiceId}`, invoice);
  };

  // Create and upload a new invoice
  const createInvoice = async (invoice) => {
    const req = await axios.post("http://localhost:2222/api/data/newInvoice", invoice);
    console.log(req);
  };

  // Update payment status on an invoice
  const updateStatus = async (id, status) => {
    const req = await axios.patch(`http://localhost:2222/api/data/invoice/status/${id}/${status}`);
  };

  const filterInvoices = (type) => {
    console.log(type);
    const invoices = invoiceState.invoiceData;
    console.log(invoices);

    if (type === "all") {
      dispatch({
        type: SET_ALL_INVOICES,
        payload: invoices,
      });
      return;
    }

    const filtered = invoices.filter((inv) => inv.status === type);

    dispatch({
      type: SET_ALL_INVOICES,
      payload: filtered,
    });
  };

  //! Returns the provider with its value - then props.children is just anything else added in betweem.
  return (
    <InvoiceContext.Provider
      value={{
        invoiceState: invoiceState,
        getAllInvoices,
        deleteInvoice,
        createInvoice,
        updateInvoice,
        setCurrentInvoice,
        updateStatus,
        filterInvoices,
      }}
    >
      {props.children}
    </InvoiceContext.Provider>
  );
};

export default InvoiceState;
