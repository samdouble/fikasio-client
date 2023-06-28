import types from './types';

const getEventsRequest = events => ({
  type: types.GET_EVENTS_REQUEST,
  payload: events,
});

const getEventsResponse = events => ({
  type: types.GET_EVENTS_RESPONSE,
  payload: events,
});

export {
  getEventsRequest,
  getEventsResponse,
};
