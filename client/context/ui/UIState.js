import { SHOW_INVOICE_WINDOW, SHOW_MODAL, SET_TYPE } from "../types";

import React, { useReducer, useContext } from "react";

import UIContext from "./UIContext";
import UIReducer from "./UIReducer";

const UIState = (props) => {
  const initialState = {
    showWindow: false,
    showModal: false,
    showSpinner: false,
    showType: "all",
  };

  const [state, dispatch] = useReducer(UIReducer, initialState);

  const showInvoiceWindow = () => {
    dispatch({
      type: SHOW_INVOICE_WINDOW,
      payload: !state.showWindow,
    });
  };

  const showConfirmModal = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: !state.showModal,
    });
  };

  const hideConfirmModal = () => {
    dispatch({
      type: SHOW_MODAL,
      payload: !state.showModal,
    });
  };

  const showSpinner = () => {
    dispatch({
      type: SHOW_SPINNER,
      payload: !state.showSpinner,
    });
  };

  const setShowType = (type) => {
    dispatch({
      type: SET_TYPE,
      payload: type,
    });
  };

  //! Returns the provider with its value - then props.children is just anything else added in betweem.
  return (
    <UIContext.Provider
      value={{
        state: state,
        showInvoiceWindow,
        showConfirmModal,
        hideConfirmModal,
        showSpinner,
        setShowType,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};

export default UIState;
