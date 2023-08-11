import {
  get,
  post,
  put,
  patch,
  del,
} from '../api';

export const getOrganizations = filter => {
  return get(`/organizations`, {}, { filter });
};

export const createOrganization = organization => {
  return post(`/organizations`, {}, organization);
};

export const updateOrganization = (id, organization) => {
  return put(`/organizations/:id`, { id }, organization);
};

export const patchOrganization = (id, organization) => {
  return patch(`/organizations/:id`, { id }, organization);
};

export const deleteOrganization = id => {
  return del(`/organizations/:id`, { id });
};
