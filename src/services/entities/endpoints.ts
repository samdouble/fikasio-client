import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getEntities = () => {
  return get('/entities', {}, {});
};

export const createEntity = entity => {
  return post('/entities', {}, entity);
};

export const updateEntity = (id, entity) => {
  return put('/entities/:id', { id }, entity);
};

export const patchEntity = (id, entity) => {
  return patch('/entities/:id', { id }, entity);
};

export const deleteEntity = id => {
  return del('/entities/:id', { id });
};

export const getFields = entityId => {
  return get('/entities/:entityId/fields', { entityId }, {});
};

export const createField = (entityId, field) => {
  return post('/entities/:entityId/fields', { entityId }, field);
};

export const updateField = (entityId, id, field) => {
  return put('/entities/:entityId/fields/:id', { entityId, id }, field);
};

export const patchField = (entityId, id, field) => {
  return patch('/entities/:entityId/fields/:id', { entityId, id }, field);
};

export const deleteField = (entityId, id) => {
  return del('/entities/:entityId/fields/:id', { entityId, id });
};

