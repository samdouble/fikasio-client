import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getActivities = (filter, q) => {
  return get('/activities', {}, {
    ...(filter && { filter }),
    ...(q && { q }),
  });
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
