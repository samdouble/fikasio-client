import { fetchRequest, fetchResponse } from './pendingRequests/actions';

export function fetchOperation(requestAction, responseAction, endpoint, getReducer, data: any[] = []) {
  return (dispatch, getState) => {
    const request = requestAction(...data);
    const { type } = request;
    const state = getState();
    const { pendingRequests } = state;
    if (!pendingRequests.includes(type)) {
      dispatch(fetchRequest(type));
      dispatch(request);
      return endpoint(...data)
        .then(res => {
          dispatch(fetchResponse(type));
          if (!res.error) {
            dispatch(responseAction(res, request.payload));
          }
        }).catch(() => dispatch(fetchResponse(type)));
    }
  };
}

export function fetchOnceOperation(requestAction, responseAction, endpoint, getReducer, data: any[] = []) {
  return (dispatch, getState) => {
    const request = requestAction(...data);
    const { type } = request;
    const state = getState();
    const reducer = getReducer(state);
    const { pendingRequests } = state;
    if (reducer === null && !pendingRequests.includes(type)) {
      dispatch(fetchRequest(type));
      dispatch(request);
      return endpoint(...data)
        .then(res => {
          dispatch(fetchResponse(type, res));
          if (!res.error) {
            dispatch(responseAction(res, request.payload));
          }
        }).catch(err => dispatch(fetchResponse(type, err)));
    }
  };
}

export default {
  fetchOperation,
  fetchOnceOperation,
};
