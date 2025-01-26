import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from 'services/store';
import type { Pane } from './types';

const initialState: { paneContent: Pane | null } = { paneContent: null };

const slice = createSlice({
  name: 'pane',
  initialState,
  reducers: {
    clearPaneContent: state => {
      state.paneContent = null;
    },
    setPaneContent: (
      state,
      {
        payload: paneContent,
      }: PayloadAction<Pane | null>,
    ) => {
      state.paneContent = paneContent;
    },
  },
});

export const { clearPaneContent, setPaneContent } = slice.actions;

export default slice.reducer;

export const getPaneContent = (state: RootState) => {
  return state.pane.paneContent;
}
