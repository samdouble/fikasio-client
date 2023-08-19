import { User } from './types';

export enum LoginActionTypes {
  LOGIN_REQUEST = 'LOGIN_REQUEST',
  LOGIN_RESPONSE = 'LOGIN_RESPONSE',
  LOGOUT_REQUEST = 'LOGOUT_REQUEST',
  LOGOUT_RESPONSE = 'LOGOUT_RESPONSE',
  SIGNUP_REQUEST = 'SIGNUP_REQUEST',
  SIGNUP_RESPONSE = 'SIGNUP_RESPONSE',
  PATCH_USERME_REQUEST = 'PATCH_USERME_REQUEST',
  PATCH_USERME_RESPONSE = 'PATCH_USERME_RESPONSE',
}

export interface PatchUserMeAction {
  payload: { user: User };
  type: LoginActionTypes.PATCH_USERME_RESPONSE;
}

export type LoginAction =
  | { type: LoginActionTypes.LOGIN_REQUEST; payload: { emailAddress: string | null, password: string | null } }
  | { type: LoginActionTypes.LOGIN_RESPONSE; payload: any }
  | { type: LoginActionTypes.LOGOUT_REQUEST; }
  | { type: LoginActionTypes.LOGOUT_RESPONSE; }
  | { type: LoginActionTypes.SIGNUP_REQUEST; payload: any }
  | { type: LoginActionTypes.SIGNUP_RESPONSE; payload: any }
  | { type: LoginActionTypes.PATCH_USERME_REQUEST; payload: { user: Partial<User> } }
  | PatchUserMeAction;

export const loginRequest = (payload: { emailAddress: string | null, password: string | null }): LoginAction => ({
  type: LoginActionTypes.LOGIN_REQUEST,
  payload,
});

export const loginResponse = (payload): LoginAction => ({
  type: LoginActionTypes.LOGIN_RESPONSE,
  payload,
});

export const logoutRequest = (): LoginAction => ({
  type: LoginActionTypes.LOGOUT_REQUEST,
});

export const logoutResponse = (): LoginAction => ({
  type: LoginActionTypes.LOGOUT_RESPONSE,
});

export const signupRequest = (payload): LoginAction => ({
  type: LoginActionTypes.SIGNUP_REQUEST,
  payload,
});

export const signupResponse = (payload): LoginAction => ({
  type: LoginActionTypes.SIGNUP_RESPONSE,
  payload,
});

export const patchUserMeRequest = (payload: { user: Partial<User> }): LoginAction => ({
  type: LoginActionTypes.PATCH_USERME_REQUEST,
  payload,
});

export const patchUserMeResponse = (payload: { user: User }): LoginAction => ({
  type: LoginActionTypes.PATCH_USERME_RESPONSE,
  payload,
});
