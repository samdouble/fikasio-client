import { get, post, patch } from '../api';

export const login = ({ emailAddress = null, password = null }) => post('/login', {}, { emailAddress, password });

export const loginGoogle = ({ accessToken, scope, tokenType }) => get('/auth/google', {}, { accessToken, scope, tokenType });

export const logout = () => post('/logout', {}, {});

export const signup = ({ user }) => post('/signup', {}, user);

export const patchUserMe = ({ user }) => patch(`/users/me`, {}, user);
