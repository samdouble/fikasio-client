import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Item } from './types';

interface UpdateFieldValueForItemQueryArgs {
  entityId: string;
  itemId: string;
  fieldId: string;
  value: any;
}

export const apiItems = createApi({
  reducerPath: 'itemsApi',
  tagTypes: ['Item'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getItemsForEntity: builder.query<Item[], string>({
      query: entityId => `entities/${entityId}/items`,
      transformResponse: (data: { items: Item[] }) => data.items,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Item'],
    }),
    addItem: builder.mutation<Item, Partial<Item> & { entityId: string; }>({
      query: ({ entityId, ...body }) => ({
        url: `entities/${entityId}/items`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { item: Item }) => data.item,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Item'],
    }),
    patchItem: builder.mutation<Item, { entityId: string; id: string; }>({
      query: ({ entityId, id, ...body }) => ({
        url: `entities/${entityId}/items/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { item: Item }) => data.item,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Item'],
    }),
    updateItem: builder.mutation<Item, { entityId: string; id: string; }>({
      query: ({ entityId, id, ...body }) => ({
        url: `entities/${entityId}/items/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { item: Item }) => data.item,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Item'],
    }),
    updateFieldValueForItem: builder.mutation<Item, UpdateFieldValueForItemQueryArgs>({
      query: ({ entityId, itemId, fieldId, ...body }) => ({
        url: `entities/${entityId}/items/${itemId}/values/${fieldId}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { item: Item }) => data.item,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Item'],
    }),
    deleteItem: builder.mutation<string, { entityId: string; id: string; }>({
      query: ({ entityId, id }) => ({
        url: `entities/${entityId}/items/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { entityId: string }) => data.entityId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Item'],
    }),
  }),
});

export const {
  useGetItemsForEntityQuery,
  useLazyGetItemsForEntityQuery,
  useAddItemMutation,
  usePatchItemMutation,
  useUpdateItemMutation,
  useUpdateFieldValueForItemMutation,
  useDeleteItemMutation,
} = apiItems;
