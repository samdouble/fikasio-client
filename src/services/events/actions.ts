export enum EventActionTypes {
  GET_EVENTS_REQUEST = 'GET_EVENTS_REQUEST',
  GET_EVENTS_RESPONSE = 'GET_EVENTS_RESPONSE',
}

export type EventAction =
  | { type: EventActionTypes.GET_EVENTS_REQUEST; }
  | { type: EventActionTypes.GET_EVENTS_RESPONSE; payload: any };

export const getEventsRequest = payload => ({
  type: EventActionTypes.GET_EVENTS_REQUEST,
  payload,
});

export const getEventsResponse = payload => ({
  type: EventActionTypes.GET_EVENTS_RESPONSE,
  payload,
});
