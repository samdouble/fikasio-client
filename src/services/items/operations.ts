import { Dispatch } from 'redux';
import {
  getItems as APIgetItems,
  createItem as APIcreateItem,
  updateItem as APIupdateItem,
  updateFieldValueForItem as APIupdateFieldValueForItem,
  patchItem as APIpatchItem,
  deleteItem as APIdeleteItem,
} from './endpoints';
import { fetchOperation, fetchOnceOperation } from '../fetchOperation';
import {
  createItemRequest,
  createItemResponse,
  getItemsRequest,
  getItemsResponse,
  updateItemRequest,
  updateItemResponse,
  updateFieldValueForItemRequest,
  updateFieldValueForItemResponse,
  patchItemRequest,
  patchItemResponse,
  deleteItemRequest,
  deleteItemResponse,
  ItemAction,
} from './actions';
import { Item } from './types';

type ItemDispatch = Dispatch<ItemAction>;

type ItemFilter = string;

const fetchedItemsFilters: ItemFilter[] = [];

function fetchItems(entityId: string) {
  const alreadyFetched = fetchedItemsFilters
    .some(f => f === entityId);
  if (!alreadyFetched) {
    fetchedItemsFilters.push(entityId);
    return fetchOperation(
      getItemsRequest,
      getItemsResponse,
      APIgetItems,
      state => state.items,
      [entityId],
    );
  }
  return fetchOnceOperation(
    getItemsRequest,
    getItemsResponse,
    APIgetItems,
    state => state.items,
    [entityId],
  );
}

function createItem(entityId: string, item: Item) {
  return (dispatch: ItemDispatch) => {
    dispatch(createItemRequest({ entityId, item }));
    return APIcreateItem(entityId, item)
      .then(res => dispatch(createItemResponse({ ...res })));
  };
}

function updateItem(entityId: string, id: string, item: Item) {
  return (dispatch: ItemDispatch) => {
    dispatch(updateItemRequest({ entityId, id, item }));
    return APIupdateItem(entityId, id, item)
      .then(res => dispatch(updateItemResponse({ ...res })));
  };
}

function updateFieldValueForItem(entityId: string, itemId: string, fieldId: string, valueInfo: any) {
  return (dispatch: ItemDispatch) => {
    dispatch(updateFieldValueForItemRequest({
      entityId,
      itemId,
      fieldId,
      valueInfo,
    }));
    return APIupdateFieldValueForItem(entityId, itemId, fieldId, valueInfo)
      .then(res => dispatch(updateFieldValueForItemResponse({ ...res })));
  };
}

function patchItem(entityId: string, id: string, item: Partial<Item>) {
  return (dispatch: ItemDispatch) => {
    dispatch(patchItemRequest({ entityId, id, item }));
    return APIpatchItem(entityId, id, item)
      .then(res => dispatch(patchItemResponse({ ...res })));
  };
}

function deleteItem(entityId: string, itemId: string) {
  return (dispatch: ItemDispatch) => {
    dispatch(deleteItemRequest({ entityId, itemId }));
    return APIdeleteItem(entityId, itemId)
      .then(res => dispatch(deleteItemResponse({ ...res })));
  };
}

const operations = {
  fetchItems,
  createItem,
  updateItem,
  updateFieldValueForItem,
  patchItem,
  deleteItem,
};

export default operations;
