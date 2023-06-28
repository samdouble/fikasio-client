import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

const getTask = id => {
  return get(`/tasks/:id`, { id }, {});
};

const getTasks = filter => {
  return get(`/tasks`, {}, { filter });
};

const createTask = task => {
  return post(`/tasks`, {}, task);
};

const updateTask = (id, task) => {
  return put(`/tasks/:id`, { id }, task);
};

const patchTask = (id, task) => {
  return patch(`/tasks/:id`, { id }, task);
};

const deleteTask = id => {
  return del(`/tasks/:id`, { id }, {});
};

export {
  getTasks,
  getTask,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
};
