import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getActivities = (filter, sort, q) => {
  return get('/activities', {}, {
    ...(filter && { filter }),
    ...(sort && { sort }),
    ...(q && { q }),
  });
};

export const getActivityEvents = id => {
  return get(`/activities/:id/events`, { id }, {});
};

export const createActivity = activity => {
  return post('/activities', {}, activity);
};

export const updateActivity = (id, activity) => {
  return put('/activities/:id', { id }, activity);
};

export const patchActivity = (id, activity) => {
  return patch('/activities/:id', { id }, activity);
};

export const deleteActivity = id => {
  return del('/activities/:id', { id });
};
