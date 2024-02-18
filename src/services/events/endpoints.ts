import { get } from '../api';

export const getEvents = filter => get(`/events`, {}, { filter });
