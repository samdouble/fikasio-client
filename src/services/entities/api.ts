import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Entity, EntityField } from './types';

export const apiEntities = createApi({
  reducerPath: 'entitiesApi',
  tagTypes: ['Entity'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getEntities: builder.query<Entity[], void>({
      query: () => 'entities',
      transformResponse: (data: { entities: Entity[] }) => data.entities,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Entity'],
    }),
    getEntity: builder.query<Entity, string>({
      query: id => `entities/${id}`,
      transformResponse: (data: { entity: Entity }) => data.entity,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Entity'],
    }),
    addEntity: builder.mutation<Entity, Partial<Entity>>({
      query: body => ({
        url: `entities`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { entity: Entity }) => data.entity,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Entity'],
    }),
    patchEntity: builder.mutation<Entity, Partial<Entity> & Pick<Entity, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `entities/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { entity: Entity }) => data.entity,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Entity'],
    }),
    updateEntity: builder.mutation<Entity, Partial<Entity> & Pick<Entity, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `entities/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { entity: Entity }) => data.entity,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Entity'],
    }),
    deleteEntity: builder.mutation<string, string>({
      query: id => ({
        url: `entities/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { entityId: string }) => data.entityId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Entity'],
    }),

    // Fields
    getFieldsInEntity: builder.query<EntityField[], string>({
      query: entityId => `entities/${entityId}/fields`,
      transformResponse: (data: { fields: EntityField[] }) => data.fields,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Entity'],
    }),
    addFieldToEntity: builder.mutation<EntityField, Partial<Entity> & { entityId: string; }>({
      query: ({ entityId, ...body }) => ({
        url: `entities/${entityId}/fields`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { field: EntityField }) => data.field,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Entity'],
    }),
    patchFieldInEntity: builder.mutation<EntityField, Partial<Entity> & Pick<Entity, 'id'> & { entityId: string; }>({
      query: ({ entityId, id, ...body }) => ({
        url: `entities/${entityId}/fields/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { field: EntityField }) => data.field,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Entity'],
    }),
    updateFieldInEntity: builder.mutation<EntityField, Partial<Entity> & Pick<Entity, 'id'> & { entityId: string; }>({
      query: ({ entityId, id, ...body }) => ({
        url: `entities/${entityId}/fields/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { field: EntityField }) => data.field,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Entity'],
    }),
    deleteFieldFromEntity: builder.mutation<string, Pick<Entity, 'id'> & { entityId: string; }>({
      query: ({ entityId, id }) => ({
        url: `entities/${entityId}/fields/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { entityId: string }) => data.entityId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Entity'],
    }),
  }),
});

export const {
  useGetEntitiesQuery,
  useLazyGetEntityQuery,
  useAddEntityMutation,
  usePatchEntityMutation,
  useUpdateEntityMutation,
  useDeleteEntityMutation,
  // Fields
  useGetFieldsInEntityQuery,
  useAddFieldToEntityMutation,
  usePatchFieldInEntityMutation,
  useUpdateFieldInEntityMutation,
  useDeleteFieldFromEntityMutation,
} = apiEntities;
