import {
  getEvents as APIgetEvents,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  getEventsRequest,
  getEventsResponse,
} from './actions';

function fetchEvents(filter) {
  return fetchOnceOperation(
    getEventsRequest,
    getEventsResponse,
    APIgetEvents,
    state => state.events,
    [filter],
  );
}

const operations = {
  fetchEvents,
};

export default operations;
