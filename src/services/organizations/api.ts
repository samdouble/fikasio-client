import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import envvars from 'utils/envvars';
import { Organization, OrganizationMember } from './types';

export const apiOrganizations = createApi({
  reducerPath: 'organizationsApi',
  tagTypes: ['Organization'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    getOrganizations: builder.query<Organization[], void>({
      query: () => 'organizations',
      transformResponse: (data: { organizations: Organization[] }) => data.organizations,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Organization'],
    }),
    getOrganization: builder.query<Organization, string>({
      query: id => `organizations/${id}`,
      transformResponse: (data: { organization: Organization }) => data.organization,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Organization'],
    }),
    addOrganization: builder.mutation<Organization, Partial<Organization>>({
      query: body => ({
        url: `organizations`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { organization: Organization }) => data.organization,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Organization'],
    }),
    patchOrganization: builder.mutation<Organization, Partial<Organization> & Pick<Organization, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `organizations/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { organization: Organization }) => data.organization,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Organization'],
    }),
    updateOrganization: builder.mutation<Organization, Partial<Organization> & Pick<Organization, 'id'>>({
      query: ({ id, ...body }) => ({
        url: `organizations/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { organization: Organization }) => data.organization,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Organization'],
    }),
    deleteOrganization: builder.mutation<string, string>({
      query: id => ({
        url: `organizations/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { organizationId: string }) => data.organizationId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Organization'],
    }),

    // Members
    getMembersInOrganization: builder.query<OrganizationMember[], string>({
      query: organizationId => `organizations/${organizationId}/members`,
      transformResponse: (data: { members: OrganizationMember[] }) => data.members,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      providesTags: ['Organization'],
    }),
    addMemberToOrganization: builder.mutation<OrganizationMember, Partial<Organization> & { organizationId: string; }>({
      query: ({ organizationId, ...body }) => ({
        url: `organizations/${organizationId}/members`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { member: OrganizationMember }) => data.member,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Organization'],
    }),
    patchMemberInOrganization: builder.mutation<OrganizationMember, Partial<Organization> & Pick<Organization, 'id'> & { organizationId: string; }>({
      query: ({ organizationId, id, ...body }) => ({
        url: `organizations/${organizationId}/members/${id}`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { member: OrganizationMember }) => data.member,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Organization'],
    }),
    updateMemberInOrganization: builder.mutation<OrganizationMember, Partial<Organization> & Pick<Organization, 'id'> & { organizationId: string; }>({
      query: ({ organizationId, id, ...body }) => ({
        url: `organizations/${organizationId}/members/${id}`,
        method: 'PUT',
        body,
      }),
      transformResponse: (data: { member: OrganizationMember }) => data.member,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Organization'],
    }),
    deleteMemberFromOrganization: builder.mutation<string, Pick<Organization, 'id'> & { organizationId: string; }>({
      query: ({ organizationId, id }) => ({
        url: `organizations/${organizationId}/members/${id}`,
        method: 'DELETE',
      }),
      transformResponse: (data: { organizationId: string }) => data.organizationId,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Organization'],
    }),
  }),
});

export const {
  useGetOrganizationsQuery,
  useLazyGetOrganizationQuery,
  useAddOrganizationMutation,
  usePatchOrganizationMutation,
  useUpdateOrganizationMutation,
  useDeleteOrganizationMutation,
  // Members
  useGetMembersInOrganizationQuery,
  useAddMemberToOrganizationMutation,
  usePatchMemberInOrganizationMutation,
  useUpdateMemberInOrganizationMutation,
  useDeleteMemberFromOrganizationMutation,
} = apiOrganizations;
