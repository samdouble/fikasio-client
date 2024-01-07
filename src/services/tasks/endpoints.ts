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

const getTaskComments = id => {
  return get(`/tasks/:id/comments`, { id }, {});
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

const deleteManyTasks = ids => {
  return del(`/tasks/batch`, {}, {}, { ids });
};

export {
  getTasks,
  getTask,
  getTaskComments,
  createTask,
  updateTask,
  patchTask,
  deleteTask,
  deleteManyTasks,
};
