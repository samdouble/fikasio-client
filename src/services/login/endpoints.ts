import { get, post, patch } from '../api';

export const login = ({ emailAddress = null, password = null }) => post('/login', {}, { emailAddress, password });

export const googleSignIn = () => get('/auth/google', {}, {});

export const logout = () => post('/logout', {}, {});

export const signup = ({ user }) => post('/signup', {}, user);

export const patchUserMe = ({ user }) => patch(`/users/me`, {}, user);
