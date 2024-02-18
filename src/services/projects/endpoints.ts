import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getProjects = filter => {
  return get(`/projects`, {}, { filter });
};

export const getProjectEvents = id => {
  return get(`/projects/:id/events`, { id }, {});
};

export const createProject = project => {
  return post(`/projects`, {}, project);
};

export const updateProject = (id, project) => {
  return put(`/projects/:id`, { id }, project);
};

export const patchProject = (id, project) => {
  return patch(`/projects/:id`, { id }, project);
};

export const deleteProject = id => {
  return del(`/projects/:id`, { id });
};
