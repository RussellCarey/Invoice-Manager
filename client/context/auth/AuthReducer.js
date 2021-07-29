import {
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  FORGOT_EMAIL_FAILED,
  FORGOT_EMAIL_SUCCESS,
  LOGOUT,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.data.data,
        token: action.payload.data.data.token,
        isAuthenticated: true,
        loading: false,
      };

    default:
      return state;
  }
};
