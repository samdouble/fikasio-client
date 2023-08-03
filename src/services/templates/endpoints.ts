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

export const getFields = templateId => {
  return get('/templates/:templateId/fields', { templateId }, {});
};

export const createField = (templateId, field) => {
  return post('/templates/:templateId/fields', { templateId }, field);
};

export const updateField = (templateId, id, field) => {
  return put('/templates/:templateId/fields/:id', { templateId, id }, field);
};

export const patchField = (templateId, id, field) => {
  return patch('/templates/:templateId/fields/:id', { templateId, id }, field);
};

export const deleteField = (templateId, id) => {
  return del('/templates/:templateId/fields/:id', { templateId, id });
};
