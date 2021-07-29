import {
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  IS_LOADING,
  IS_NOT_LOADING,
  SHOW_MODAL,
  HIDE_MODAL,
} from "../types";

import React, { useReducer, useContext } from "react";
import axios from "axios";

import AuthContext from "./AuthContext";
import AuthReducer from "./AuthReducer";

import UIContext from "../ui/UIContext";

const AuthState = (props) => {
  const initialState = {
    token: "",
    isAuthenticated: false,
    loading: false,
    user: null,
  };

  const [state, dispatch] = useReducer(AuthReducer, initialState);

  const uiContext = useContext(UIContext);
  const { showModal } = uiContext;

  const checkAuth = async () => {
    try {
      const auth = await axios.get("http://localhost:9999/api/users/check", {
        withCredentials: true,
        credentials: "include",
      });

      if (auth.data.status === "success") {
        console.log("Auth was success chucking auth to things");
        dispatch({
          type: LOGIN_SUCCESS,
          payload: auth,
        });
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const Login = async (user) => {
    try {
      const newUserDetails = await axios.post(
        `http://localhost:9999/api/users/login`,
        user,
        { withCredentials: true, credentials: "include" }
      );

      if (newUserDetails.data.status === "success") {
        dispatch({
          type: LOGIN_SUCCESS,
          payload: newUserDetails,
        });
      } else {
        dispatch({
          type: LOGIN_FAILED,
        });
        showModal("Login failed, please try again.");
      }
    } catch (error) {
      console.log(error);
      dispatch({
        type: LOGIN_FAILED,
      });
      showModal("Login failed, please try again.");
    }
  };

  const sendSignUp = async (details) => {
    try {
      if (details.email !== details.emailConfirm)
        console.log("Emails dont match");
      if (details.password !== details.passwordConfirm)
        console.log("Emails dont match");

      const newUserDetails = await axios.post(
        `http://localhost:9999/api/users/signup`,
        details
      );

      //! Rediret to map - cant add items till confirmed your email address
    } catch (error) {
      //
    }
  };

  //! Returns the provider with its value - then props.children is just anything else added in betweem.
  return (
    <AuthContext.Provider
      value={{
        Login,
        checkAuth,
        sendSignUp,
        state: state,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthState;
