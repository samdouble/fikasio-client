import uniqBy from 'lodash.uniqby';
import { EntityAction, EntityActionTypes } from './actions';
import { Entity } from './types';

export type EntityReducerState = Entity[] | null;

export default function reducer(state: EntityReducerState = null, action: EntityAction) {
  switch (action.type) {
    case EntityActionTypes.GET_ENTITIES_RESPONSE:
      const newEntities = action.payload.entities;
      return uniqBy((state || []).concat(newEntities), 'id');
    case EntityActionTypes.CREATE_ENTITY_RESPONSE:
      return (state || []).concat(action.payload.entity);
    case EntityActionTypes.UPDATE_ENTITY_RESPONSE:
    case EntityActionTypes.PATCH_ENTITY_RESPONSE:
      return state?.map(entity => {
        if (entity.id === action.payload.entity.id) {
          return action.payload.entity;
        }
        return entity;
      });
    case EntityActionTypes.DELETE_ENTITY_RESPONSE:
      return state?.filter(entity => entity.id !== action.payload.entityId);

    case EntityActionTypes.CREATE_FIELD_RESPONSE:
      return state?.map(entity => {
        if (entity.id === action.payload.entityId) {
          return {
            ...entity,
            fields: [
              ...entity.fields,
              action.payload.field,
            ],
          };
        }
        return entity;
      });
    case EntityActionTypes.UPDATE_FIELD_RESPONSE:
    case EntityActionTypes.PATCH_FIELD_RESPONSE:
      return state?.map(entity => {
        if (entity.id === action.payload.entityId) {
          return {
            ...entity,
            fields: entity.fields?.map(field => {
              if (field.id === action.payload.field.id) {
                return action.payload.field;
              }
              return field;
            }),
          };
        }
        return entity;
      });
    case EntityActionTypes.DELETE_FIELD_RESPONSE:
      return state?.map(entity => {
        if (entity.id === action.payload.entityId) {
          return {
            ...entity,
            fields: entity.fields?.filter(field => (
              field.id !== action.payload.fieldId
            )),
          };
        }
        return entity;
      });
    default:
      return state;
  }
}
