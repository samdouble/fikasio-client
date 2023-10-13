import { get } from '../api';

const getEvents = filter => {
  return get(`/events`, {}, { filter });
};

export {
  getEvents,
};
