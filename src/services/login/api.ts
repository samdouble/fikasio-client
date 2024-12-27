import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { User } from 'services/login/types';
import envvars from 'utils/envvars';
import { ConnectionInfos, LoginInfos, SignupInfos } from './types';

export const apiLogin = createApi({
  reducerPath: 'loginApi',
  tagTypes: ['Login'],
  baseQuery: fetchBaseQuery({
    baseUrl: (process.env.NODE_ENV === 'production')
      ? `${envvars.apiServer}/v1`
      : 'http://localhost:3000/v1/',
    credentials: 'include',
  }),
  endpoints: builder => ({
    login: builder.mutation<ConnectionInfos, Partial<LoginInfos>>({
      query: body => ({
        url: `login`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { user: User }) => data.user,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      // invalidatesTags: ['Login'],
    }),
    logout: builder.mutation<void, void>({
      query: body => ({
        url: `logout`,
        method: 'POST',
        body,
      }),
      transformResponse: () => undefined,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Login'],
    }),
    signup: builder.mutation<ConnectionInfos, Partial<SignupInfos>>({
      query: body => ({
        url: `signup`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: { login: ConnectionInfos }) => data.login,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Login'],
    }),
    verify: builder.mutation<void, void>({
      query: body => ({
        url: `verify`,
        method: 'POST',
        body,
      }),
      transformResponse: () => undefined,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Login'],
    }),
    patchUserMe: builder.mutation<User, Partial<User>>({
      query: body => ({
        url: `users/me`,
        method: 'PATCH',
        body,
      }),
      transformResponse: (data: { user: User }) => data.user,
      transformErrorResponse: (response: { status: string | number }) => response.status,
      invalidatesTags: ['Login'],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useSignupMutation,
  useVerifyMutation,
  usePatchUserMeMutation,
} = apiLogin;
