import types from './types';

export default function reducer (state = null, action) {
  switch (action.type) {
    case types.GET_EVENTS_RESPONSE:
      return action.payload.events;
    default:
      return state;
  }
}
