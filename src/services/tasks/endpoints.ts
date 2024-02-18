import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getTask = id => {
  return get(`/tasks/:id`, { id }, {});
};

export const getTasks = filter => {
  return get(`/tasks`, {}, { filter });
};

export const getTaskComments = id => {
  return get(`/tasks/:id/comments`, { id }, {});
};

export const getTaskEvents = id => {
  return get(`/tasks/:id/events`, { id }, {});
};

export const createTask = task => {
  return post(`/tasks`, {}, task);
};

export const updateTask = (id, task) => {
  return put(`/tasks/:id`, { id }, task);
};

export const patchTask = (id, task) => {
  return patch(`/tasks/:id`, { id }, task);
};

export const patchManyTasks = (ids, infos) => {
  return patch(`/tasks/batch`, {}, { ids, infos });
};

export const deleteTask = id => {
  return del(`/tasks/:id`, { id }, {});
};

export const deleteManyTasks = ids => {
  return del(`/tasks/batch`, {}, {}, { ids });
};
