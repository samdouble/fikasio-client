import { Dispatch } from 'redux';
import {
  getEntities as APIgetEntities,
  createEntity as APIcreateEntity,
  updateEntity as APIupdateEntity,
  patchEntity as APIpatchEntity,
  deleteEntity as APIdeleteEntity,
  getFields as APIgetFields,
  createField as APIcreateField,
  updateField as APIupdateField,
  patchField as APIpatchField,
  deleteField as APIdeleteField,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  createEntityRequest,
  createEntityResponse,
  getEntitiesRequest,
  getEntitiesResponse,
  updateEntityRequest,
  updateEntityResponse,
  patchEntityRequest,
  patchEntityResponse,
  deleteEntityRequest,
  deleteEntityResponse,
  createFieldRequest,
  createFieldResponse,
  getFieldsRequest,
  getFieldsResponse,
  updateFieldRequest,
  updateFieldResponse,
  patchFieldRequest,
  patchFieldResponse,
  deleteFieldRequest,
  deleteFieldResponse,
  EntityAction,
} from './actions';
import { Entity, EntityField } from './types';

type EntityDispatch = Dispatch<EntityAction>;

function fetchEntities() {
  return fetchOnceOperation(
    getEntitiesRequest,
    getEntitiesResponse,
    APIgetEntities,
    state => state.entities,
    [],
  );
}

function createEntity(entity: Partial<Entity>) {
  return (dispatch: EntityDispatch) => {
    dispatch(createEntityRequest({ entity }));
    return APIcreateEntity(entity)
      .then(res => dispatch(createEntityResponse({ ...res })));
  };
}

function updateEntity(id: string, entity: Entity) {
  return (dispatch: EntityDispatch) => {
    dispatch(updateEntityRequest({ id, entity }));
    return APIupdateEntity(id, entity)
      .then(res => dispatch(updateEntityResponse({ ...res })));
  };
}

function patchEntity(id: string, entity: Partial<Entity>) {
  return (dispatch: EntityDispatch) => {
    dispatch(patchEntityRequest({ id, entity }));
    return APIpatchEntity(id, entity)
      .then(res => dispatch(patchEntityResponse({ ...res })));
  };
}

function deleteEntity(entityId: string) {
  return (dispatch: EntityDispatch) => {
    dispatch(deleteEntityRequest({ entityId }));
    return APIdeleteEntity(entityId)
      .then(res => dispatch(deleteEntityResponse({ ...res })));
  };
}

function fetchFields(filter) {
  return fetchOnceOperation(
    getFieldsRequest,
    getFieldsResponse,
    APIgetFields,
    state => state.fields,
    [filter],
  );
}

function createField(entityId: string, field: EntityField) {
  return (dispatch: EntityDispatch) => {
    dispatch(createFieldRequest({ entityId, field }));
    return APIcreateField(entityId, field)
      .then(res => dispatch(createFieldResponse({ entityId, ...res })));
  };
}

function updateField(entityId: string, id: string, field: EntityField) {
  return (dispatch: EntityDispatch) => {
    dispatch(updateFieldRequest({ entityId, id, field }));
    return APIupdateField(entityId, id, field)
      .then(res => dispatch(updateFieldResponse({ entityId, ...res })));
  };
}

function patchField(entityId: string, id, field: Partial<EntityField>) {
  return (dispatch: EntityDispatch) => {
    dispatch(patchFieldRequest({ entityId, id, field }));
    return APIpatchField(entityId, id, field)
      .then(res => dispatch(patchFieldResponse({ entityId, ...res })));
  };
}

function deleteField(entityId: string, fieldId: string) {
  return (dispatch: EntityDispatch) => {
    dispatch(deleteFieldRequest({ entityId, fieldId }));
    return APIdeleteField(entityId, fieldId)
      .then(res => dispatch(deleteFieldResponse({ entityId, ...res })));
  };
}

const operations = {
  fetchEntities,
  createEntity,
  updateEntity,
  patchEntity,
  deleteEntity,
  fields: {
    fetchFields,
    createField,
    updateField,
    patchField,
    deleteField,
  },
};

export default operations;
