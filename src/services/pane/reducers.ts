import { PaneAction, PaneActionTypes } from './actions';
import { Pane } from './types';

export default function reducer(state: Pane | null = null, action: PaneAction) {
  switch (action.type) {
    case PaneActionTypes.CLEAR_PANE_CONTENT:
      return null;
    case PaneActionTypes.SET_PANE_CONTENT:
      return action.payload;
    default:
      return state;
  }
}
