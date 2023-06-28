import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getItems = entityId => {
  return get('/entities/:entityId/items', { entityId }, {});
};

export const createItem = (entityId, item) => {
  return post('/entities/:entityId/items', { entityId }, item);
};

export const updateItem = (entityId, id, item) => {
  return put('/entities/:entityId/items/:id', { entityId, id }, item);
};

export const updateFieldValueForItem = (entityId, itemId, fieldId, valueInfos) => {
  return put('/entities/:entityId/items/:itemId/values/:fieldId', { entityId, itemId, fieldId }, valueInfos);
};

export const patchItem = (entityId, id, item) => {
  return patch('/entities/:entityId/items/:id', { entityId, id }, item);
};

export const deleteItem = (entityId, id) => {
  return del('/entities/:entityId/items/:id', { entityId, id });
};
