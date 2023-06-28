import uniqBy from 'lodash.uniqby';
import { ItemAction, ItemActionTypes } from './actions';
import { Item } from './types';

export type ItemReducerState = Item[] | null;

export default function reducer(state: ItemReducerState = null, action: ItemAction) {
  switch (action.type) {
    case ItemActionTypes.GET_ITEMS_RESPONSE:
      const newItems = action.payload.items;
      return uniqBy((state || []).concat(newItems), 'id');
    case ItemActionTypes.CREATE_ITEM_RESPONSE:
      return (state || []).concat(action.payload.item);
    case ItemActionTypes.UPDATE_ITEM_RESPONSE:
    case ItemActionTypes.PATCH_ITEM_RESPONSE:
      return state?.map(item => {
        if (item.id === action.payload.item.id) {
          return action.payload.item;
        }
        return item;
      });
    case ItemActionTypes.DELETE_ITEM_RESPONSE:
      return state?.filter(item => item.id !== action.payload.itemId);
    default:
      return state;
  }
}
