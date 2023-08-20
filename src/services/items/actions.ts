import { Item } from './types';

export enum ItemActionTypes {
  CREATE_ITEM_REQUEST = 'CREATE_ITEM_REQUEST',
  CREATE_ITEM_RESPONSE = 'CREATE_ITEM_RESPONSE',
  GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST',
  GET_ITEMS_RESPONSE = 'GET_ITEMS_RESPONSE',
  UPDATE_ITEM_REQUEST = 'UPDATE_ITEM_REQUEST',
  UPDATE_ITEM_RESPONSE = 'UPDATE_ITEM_RESPONSE',
  UPDATE_FIELDVALUE_FOR_ITEM_REQUEST = 'UPDATE_FIELDVALUE_FOR_ITEM_REQUEST',
  UPDATE_FIELDVALUE_FOR_ITEM_RESPONSE = 'UPDATE_FIELDVALUE_FOR_ITEM_RESPONSE',
  PATCH_ITEM_REQUEST = 'PATCH_ITEM_REQUEST',
  PATCH_ITEM_RESPONSE = 'PATCH_ITEM_RESPONSE',
  DELETE_ITEM_REQUEST = 'DELETE_ITEM_REQUEST',
  DELETE_ITEM_RESPONSE = 'DELETE_ITEM_RESPONSE',
}

export type ItemAction =
  | { type: ItemActionTypes.CREATE_ITEM_REQUEST; payload: { entityId: string, item: Partial<Item> } }
  | { type: ItemActionTypes.CREATE_ITEM_RESPONSE; payload: { item: Item } }
  | { type: ItemActionTypes.GET_ITEMS_REQUEST; payload: { entityId: string, items: Item[] } }
  | { type: ItemActionTypes.GET_ITEMS_RESPONSE; payload: { items: Item[] } }
  | { type: ItemActionTypes.UPDATE_ITEM_REQUEST; payload: { entityId: string, id: string; item: Item } }
  | { type: ItemActionTypes.UPDATE_ITEM_RESPONSE; payload: { item: Item } }
  | {
    type: ItemActionTypes.UPDATE_FIELDVALUE_FOR_ITEM_REQUEST;
    payload: { entityId: string, itemId: string; fieldId: string, valueInfo: any
  } }
  | { type: ItemActionTypes.UPDATE_FIELDVALUE_FOR_ITEM_RESPONSE; payload: { item: Item } }
  | { type: ItemActionTypes.PATCH_ITEM_REQUEST; payload: { entityId: string, id: string; item: Partial<Item> } }
  | { type: ItemActionTypes.PATCH_ITEM_RESPONSE; payload: { item: Item } }
  | { type: ItemActionTypes.DELETE_ITEM_REQUEST; payload: { entityId: string, itemId: string } }
  | { type: ItemActionTypes.DELETE_ITEM_RESPONSE; payload: { itemId: string } };

export const createItemRequest = (payload: { entityId: string, item: Partial<Item> }): ItemAction => ({
  type: ItemActionTypes.CREATE_ITEM_REQUEST,
  payload,
});

export const createItemResponse = (payload: { item: Item }): ItemAction => ({
  type: ItemActionTypes.CREATE_ITEM_RESPONSE,
  payload,
});

export const getItemsRequest = (payload: { entityId: string, items: Item[] }): ItemAction => ({
  type: ItemActionTypes.GET_ITEMS_REQUEST,
  payload,
});

export const getItemsResponse = (payload: { items: Item[] }): ItemAction => ({
  type: ItemActionTypes.GET_ITEMS_RESPONSE,
  payload,
});

export const updateItemRequest = (payload: { entityId: string, id: string, item: Item }): ItemAction => ({
  type: ItemActionTypes.UPDATE_ITEM_REQUEST,
  payload,
});

export const updateItemResponse = (payload: { item: Item }): ItemAction => ({
  type: ItemActionTypes.UPDATE_ITEM_RESPONSE,
  payload,
});

export const updateFieldValueForItemRequest = (payload: {
  entityId: string,
  itemId: string,
  fieldId: string,
  valueInfo: any,
}): ItemAction => ({
  type: ItemActionTypes.UPDATE_FIELDVALUE_FOR_ITEM_REQUEST,
  payload,
});

export const updateFieldValueForItemResponse = (payload: { item: Item }): ItemAction => ({
  type: ItemActionTypes.UPDATE_FIELDVALUE_FOR_ITEM_RESPONSE,
  payload,
});

export const patchItemRequest = (payload: { entityId: string, id: string, item: Partial<Item> }): ItemAction => ({
  type: ItemActionTypes.PATCH_ITEM_REQUEST,
  payload,
});

export const patchItemResponse = (payload: { item: Item }): ItemAction => ({
  type: ItemActionTypes.PATCH_ITEM_RESPONSE,
  payload,
});

export const deleteItemRequest = (payload: { entityId: string, itemId: string }): ItemAction => ({
  type: ItemActionTypes.DELETE_ITEM_REQUEST,
  payload,
});

export const deleteItemResponse = (payload: { itemId: string }): ItemAction => ({
  type: ItemActionTypes.DELETE_ITEM_RESPONSE,
  payload,
});
