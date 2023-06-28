import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getObjectives = filter => {
  return get(`/objectives`, {}, { filter });
};

export const createObjective = objective => {
  return post(`/objectives`, {}, objective);
};

export const updateObjective = (id, objective) => {
  return put(`/objectives/:id`, { id }, objective);
};

export const patchObjective = (id, objective) => {
  return patch(`/objectives/:id`, { id }, objective);
};

export const deleteObjective = id => {
  return del(`/objectives/:id`, { id });
};
