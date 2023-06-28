import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getTemplates = () => {
  return get('/templates', {}, {});
};

export const createTemplate = template => {
  return post('/templates', {}, template);
};

export const updateTemplate = (id, template) => {
  return put('/templates/:id', { id }, template);
};

export const patchTemplate = (id, template) => {
  return patch('/templates/:id', { id }, template);
};

export const deleteTemplate = id => {
  return del('/templates/:id', { id });
};
