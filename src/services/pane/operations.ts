import { Dispatch } from 'redux';
import { PaneAction, clearPaneContent as clearPane, setPaneContent as setPane } from './actions';
import { Pane } from './types';

type PaneDispatch = Dispatch<PaneAction>;

function clearPaneContent() {
  return (dispatch: PaneDispatch) => dispatch(clearPane());
}

function setPaneContent(pane: Pane) {
  return (dispatch: PaneDispatch) => dispatch(setPane(pane));
}

const operations = {
  clearPaneContent,
  setPaneContent,
};

export default operations;
