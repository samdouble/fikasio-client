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

export const getMembers = organizationId => {
  return get('/organizations/:organizationId/members', { organizationId }, {});
};

export const createMember = (organizationId, member) => {
  return post('/organizations/:organizationId/members', { organizationId }, member);
};

export const updateMember = (organizationId, id, member) => {
  return put('/organizations/:organizationId/members/:id', { organizationId, id }, member);
};

export const patchMember = (organizationId, id, member) => {
  return patch('/organizations/:organizationId/members/:id', { organizationId, id }, member);
};

export const deleteMember = (organizationId, id) => {
  return del('/organizations/:organizationId/members/:id', { organizationId, id });
};
