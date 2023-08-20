import { Entity, EntityField } from './types';

export enum EntityActionTypes {
  CREATE_ENTITY_REQUEST = 'CREATE_ENTITY_REQUEST',
  CREATE_ENTITY_RESPONSE = 'CREATE_ENTITY_RESPONSE',
  GET_ENTITIES_REQUEST = 'GET_ENTITIES_REQUEST',
  GET_ENTITIES_RESPONSE = 'GET_ENTITIES_RESPONSE',
  UPDATE_ENTITY_REQUEST = 'UPDATE_ENTITY_REQUEST',
  UPDATE_ENTITY_RESPONSE = 'UPDATE_ENTITY_RESPONSE',
  PATCH_ENTITY_REQUEST = 'PATCH_ENTITY_REQUEST',
  PATCH_ENTITY_RESPONSE = 'PATCH_ENTITY_RESPONSE',
  DELETE_ENTITY_REQUEST = 'DELETE_ENTITY_REQUEST',
  DELETE_ENTITY_RESPONSE = 'DELETE_ENTITY_RESPONSE',

  CREATE_ENTITY_FIELD_REQUEST = 'CREATE_ENTITY_FIELD_REQUEST',
  CREATE_ENTITY_FIELD_RESPONSE = 'CREATE_ENTITY_FIELD_RESPONSE',
  GET_ENTITY_FIELDS_REQUEST = 'GET_ENTITY_FIELDS_REQUEST',
  GET_ENTITY_FIELDS_RESPONSE = 'GET_ENTITY_FIELDS_RESPONSE',
  UPDATE_ENTITY_FIELD_REQUEST = 'UPDATE_ENTITY_FIELD_REQUEST',
  UPDATE_ENTITY_FIELD_RESPONSE = 'UPDATE_ENTITY_FIELD_RESPONSE',
  PATCH_ENTITY_FIELD_REQUEST = 'PATCH_ENTITY_FIELD_REQUEST',
  PATCH_ENTITY_FIELD_RESPONSE = 'PATCH_ENTITY_FIELD_RESPONSE',
  DELETE_ENTITY_FIELD_REQUEST = 'DELETE_ENTITY_FIELD_REQUEST',
  DELETE_ENTITY_FIELD_RESPONSE = 'DELETE_ENTITY_FIELD_RESPONSE',
}

export type EntityAction =
  | { type: EntityActionTypes.CREATE_ENTITY_REQUEST; payload: { entity: Partial<Entity> } }
  | { type: EntityActionTypes.CREATE_ENTITY_RESPONSE; payload: { entity: Entity } }
  | { type: EntityActionTypes.GET_ENTITIES_REQUEST; payload: { entities: Entity[] } }
  | { type: EntityActionTypes.GET_ENTITIES_RESPONSE; payload: { entities: Entity[] } }
  | { type: EntityActionTypes.UPDATE_ENTITY_REQUEST; payload: { id: string; entity: Entity } }
  | { type: EntityActionTypes.UPDATE_ENTITY_RESPONSE; payload: { entity: Entity } }
  | { type: EntityActionTypes.PATCH_ENTITY_REQUEST; payload: { id: string; entity: Partial<Entity> } }
  | { type: EntityActionTypes.PATCH_ENTITY_RESPONSE; payload: { entity: Entity } }
  | { type: EntityActionTypes.DELETE_ENTITY_REQUEST; payload: { entityId: string } }
  | { type: EntityActionTypes.DELETE_ENTITY_RESPONSE; payload: { entityId: string } }

  | { type: EntityActionTypes.CREATE_ENTITY_FIELD_REQUEST; payload: { entityId: string; field: EntityField } }
  | { type: EntityActionTypes.CREATE_ENTITY_FIELD_RESPONSE; payload: { entityId: string; field: EntityField } }
  | { type: EntityActionTypes.GET_ENTITY_FIELDS_REQUEST; payload: { entityId: string; fields: EntityField[] } }
  | { type: EntityActionTypes.GET_ENTITY_FIELDS_RESPONSE; payload: { entityId: string; fields: EntityField[] } }
  | { type: EntityActionTypes.UPDATE_ENTITY_FIELD_REQUEST; payload: {
    entityId: string;
    id: string;
    field: EntityField;
  } }
  | { type: EntityActionTypes.UPDATE_ENTITY_FIELD_RESPONSE; payload: { entityId: string; field: EntityField } }
  | { type: EntityActionTypes.PATCH_ENTITY_FIELD_REQUEST; payload: {
    entityId: string;
    id: string;
    field: Partial<EntityField>;
  } }
  | { type: EntityActionTypes.PATCH_ENTITY_FIELD_RESPONSE; payload: { entityId: string; field: EntityField } }
  | { type: EntityActionTypes.DELETE_ENTITY_FIELD_REQUEST; payload: { entityId: string; fieldId: string } }
  | { type: EntityActionTypes.DELETE_ENTITY_FIELD_RESPONSE; payload: { entityId: string; fieldId: string } };

export const createEntityRequest = (payload: { entity: Partial<Entity> }): EntityAction => ({
  type: EntityActionTypes.CREATE_ENTITY_REQUEST,
  payload,
});

export const createEntityResponse = (payload: { entity: Entity }): EntityAction => ({
  type: EntityActionTypes.CREATE_ENTITY_RESPONSE,
  payload,
});

export const getEntitiesRequest = (payload: { entities: Entity[] }): EntityAction => ({
  type: EntityActionTypes.GET_ENTITIES_REQUEST,
  payload,
});

export const getEntitiesResponse = (payload: { entities: Entity[] }): EntityAction => ({
  type: EntityActionTypes.GET_ENTITIES_RESPONSE,
  payload,
});

export const updateEntityRequest = (payload: { id: string, entity: Entity }): EntityAction => ({
  type: EntityActionTypes.UPDATE_ENTITY_REQUEST,
  payload,
});

export const updateEntityResponse = (payload: { entity: Entity }): EntityAction => ({
  type: EntityActionTypes.UPDATE_ENTITY_RESPONSE,
  payload,
});

export const patchEntityRequest = (payload: { id: string, entity: Partial<Entity> }): EntityAction => ({
  type: EntityActionTypes.PATCH_ENTITY_REQUEST,
  payload,
});

export const patchEntityResponse = (payload: { entity: Entity }): EntityAction => ({
  type: EntityActionTypes.PATCH_ENTITY_RESPONSE,
  payload,
});

export const deleteEntityRequest = (payload: { entityId: string }): EntityAction => ({
  type: EntityActionTypes.DELETE_ENTITY_REQUEST,
  payload,
});

export const deleteEntityResponse = (payload: { entityId: string }): EntityAction => ({
  type: EntityActionTypes.DELETE_ENTITY_RESPONSE,
  payload,
});

export const createFieldRequest = (payload: { entityId: string, field: EntityField }): EntityAction => ({
  type: EntityActionTypes.CREATE_ENTITY_FIELD_REQUEST,
  payload,
});

export const createFieldResponse = (payload: { entityId: string, field: EntityField }): EntityAction => ({
  type: EntityActionTypes.CREATE_ENTITY_FIELD_RESPONSE,
  payload,
});

export const getFieldsRequest = (payload: { entityId: string, fields: EntityField[] }): EntityAction => ({
  type: EntityActionTypes.GET_ENTITY_FIELDS_REQUEST,
  payload,
});

export const getFieldsResponse = (payload: { entityId: string, fields: EntityField[] }): EntityAction => ({
  type: EntityActionTypes.GET_ENTITY_FIELDS_RESPONSE,
  payload,
});

export const updateFieldRequest = (payload: { entityId: string, id: string, field: EntityField }): EntityAction => ({
  type: EntityActionTypes.UPDATE_ENTITY_FIELD_REQUEST,
  payload,
});

export const updateFieldResponse = (payload: { entityId: string, field: EntityField }): EntityAction => ({
  type: EntityActionTypes.UPDATE_ENTITY_FIELD_RESPONSE,
  payload,
});

export const patchFieldRequest = (payload: {
  entityId: string,
  id: string,
  field: Partial<EntityField>,
}): EntityAction => ({
  type: EntityActionTypes.PATCH_ENTITY_FIELD_REQUEST,
  payload,
});

export const patchFieldResponse = (payload: { entityId: string, field: EntityField }): EntityAction => ({
  type: EntityActionTypes.PATCH_ENTITY_FIELD_RESPONSE,
  payload,
});

export const deleteFieldRequest = (payload: { entityId: string, fieldId: string }): EntityAction => ({
  type: EntityActionTypes.DELETE_ENTITY_FIELD_REQUEST,
  payload,
});

export const deleteFieldResponse = (payload: { entityId: string, fieldId: string }): EntityAction => ({
  type: EntityActionTypes.DELETE_ENTITY_FIELD_RESPONSE,
  payload,
});
