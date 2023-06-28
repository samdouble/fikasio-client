import { Pane } from './types';

export enum PaneActionTypes {
  CLEAR_PANE_CONTENT = 'CLEAR_PANE_CONTENT',
  SET_PANE_CONTENT = 'SET_PANE',
}

export type PaneAction =
  | { type: PaneActionTypes.CLEAR_PANE_CONTENT; }
  | { type: PaneActionTypes.SET_PANE_CONTENT; payload: Pane };

export const clearPaneContent = (): PaneAction => ({
  type: PaneActionTypes.CLEAR_PANE_CONTENT,
});

export const setPaneContent = (pane: Pane): PaneAction => ({
  type: PaneActionTypes.SET_PANE_CONTENT,
  payload: pane,
});
