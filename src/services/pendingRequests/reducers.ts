import { PendingRequestAction, PendingRequestActionTypes } from './actions';

function pendingRequests(state: any[] = [], action: PendingRequestAction) {
  switch (action.type) {
    case PendingRequestActionTypes.FETCH_REQUEST:
      return [...state, action.payload.type];
    case PendingRequestActionTypes.FETCH_RESPONSE:
      const newState = [...state];
      const index = newState.indexOf(action.payload.type);
      if (index >= 0) {
        newState.splice(index, 1);
      }
      return newState;
    default:
      return state;
  }
}

export default pendingRequests;
