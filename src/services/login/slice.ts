import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'services/store';
import type { ConnectionInfos } from './types';

type AuthState = {
  user: ConnectionInfos | null;
  token: string | null;
}

const initialState: AuthState = { user: null, token: null };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user },
      }: PayloadAction<{ user: ConnectionInfos | null; }>,
    ) => {
      state.user = user;
    },
  },
});

export const { setCredentials } = slice.actions;

export default slice.reducer;

export const selectCurrentUser = (state: RootState) => {
  return state.auth.user;
}
