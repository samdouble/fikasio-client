import { LoginAction, LoginActionTypes } from './actions';
import { Login } from './types';

export default function reducer(state: Login | null = null, action: LoginAction) {
  switch (action.type) {
    case LoginActionTypes.LOGIN_RESPONSE:
      return action.payload;
    case LoginActionTypes.LOGOUT_RESPONSE:
      return null;
    case LoginActionTypes.PATCH_USERME_RESPONSE:
      return action.payload;
    default:
      return state;
  }
}
