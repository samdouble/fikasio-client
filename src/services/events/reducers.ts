import { EventAction, EventActionTypes } from './actions';
import { Event } from './types';

export default function reducer(state: Event[] | null = null, action: EventAction) {
  switch (action.type) {
    case EventActionTypes.GET_EVENTS_RESPONSE:
      return action.payload.events;
    default:
      return state;
  }
}
