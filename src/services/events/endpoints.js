import { get, post } from '../api';

const getEvents = filter => {
  return get(`/events`, {}, { filter });
};

const createEvent = event => {
  return post(`/events`, {}, event);
};

export {
  getEvents,
  createEvent,
};
