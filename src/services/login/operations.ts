import { Dispatch } from 'redux';
import {
  login as APIlogin,
  logout as APIlogout,
  signup as APIsignup,
  patchUserMe as APIpatchUserMe,
} from './endpoints';
import {
  loginRequest,
  loginResponse,
  logoutRequest,
  logoutResponse,
  signupRequest,
  signupResponse,
  patchUserMeRequest,
  patchUserMeResponse,
  LoginAction,
} from './actions';
import { User } from './types';

type LoginDispatch = Dispatch<LoginAction>;

function login(emailAddress = null, password = null) {
  return (dispatch: LoginDispatch) => {
    dispatch(loginRequest({ emailAddress, password }));
    return APIlogin({ emailAddress, password })
      .then(res => dispatch(loginResponse(res)))
      .catch(() => dispatch(loginResponse(null)));
  };
}

function logout() {
  return (dispatch: LoginDispatch) => {
    dispatch(logoutRequest());
    return APIlogout()
      .then(() => dispatch(logoutResponse()));
  };
}

const signup = (user: User) => {
  return (dispatch: LoginDispatch) => {
    dispatch(signupRequest({ user }));
    return APIsignup({ user })
      .then(res => {
        dispatch(signupResponse({ ...res }));
        return res;
      })
  };
};

const patchUserMe = (user: User) => {
  return (dispatch: LoginDispatch) => {
    dispatch(patchUserMeRequest({ user }));
    return APIpatchUserMe({ user })
      .then(res => dispatch(patchUserMeResponse({ ...res })));
  };
};

const operations = {
  login,
  logout,
  signup,
  patchUserMe,
};

export default operations;
