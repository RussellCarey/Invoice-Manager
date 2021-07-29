import { SHOW_EDIT_WINDOW, SHOW_NEW_WINDOW } from "../types";

import React, { useReducer, useContext } from "react";

import UIContext from "./UIContext";
import UIReducer from "./UIReducer";

const UIState = (props) => {
  const initialState = {
    showEditWindow: false,
    showNewWindow: false,
  };

  const [state, dispatch] = useReducer(UIReducer, initialState);

  const showNewInvoiceWindow = () => {
    dispatch({
      type: SHOW_NEW_WINDOW,
      payload: !state.showNewWindow,
    });
  };

  //! Returns the provider with its value - then props.children is just anything else added in betweem.
  return (
    <UIContext.Provider
      value={{
        state: state,
        showNewInvoiceWindow,
      }}
    >
      {props.children}
    </UIContext.Provider>
  );
};

export default UIState;
