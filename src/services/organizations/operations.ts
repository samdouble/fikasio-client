import { Dispatch } from 'redux';
import {
  getOrganizations as APIgetOrganizations,
  createOrganization as APIcreateOrganization,
  updateOrganization as APIupdateOrganization,
  patchOrganization as APIpatchOrganization,
  deleteOrganization as APIdeleteOrganization,
} from './endpoints';
import { fetchOnceOperation } from '../fetchOperation';
import {
  createOrganizationRequest,
  createOrganizationResponse,
  getOrganizationsRequest,
  getOrganizationsResponse,
  updateOrganizationRequest,
  updateOrganizationResponse,
  patchOrganizationRequest,
  patchOrganizationResponse,
  deleteOrganizationRequest,
  deleteOrganizationResponse,
  OrganizationAction,
} from './actions';
import { Organization } from './types';

type OrganizationDispatch = Dispatch<OrganizationAction>;

function fetchOrganizations(filter = {}) {
  return fetchOnceOperation(
    getOrganizationsRequest,
    getOrganizationsResponse,
    APIgetOrganizations,
    state => state.organizations,
    [filter],
  );
}

function createOrganization(organization: Organization) {
  return (dispatch: OrganizationDispatch) => {
    dispatch(createOrganizationRequest({ organization }));
    return APIcreateOrganization(organization)
      .then(res => dispatch(createOrganizationResponse({ ...res })));
  };
}

function updateOrganization(id: string, organization: Organization) {
  return (dispatch: OrganizationDispatch) => {
    dispatch(updateOrganizationRequest({ id, organization }));
    return APIupdateOrganization(id, organization)
      .then(res => dispatch(updateOrganizationResponse({ ...res })));
  };
}

function patchOrganization(id: string, organization: Partial<Organization>) {
  return (dispatch: OrganizationDispatch) => {
    dispatch(patchOrganizationRequest({ id, organization }));
    return APIpatchOrganization(id, organization)
      .then(res => dispatch(patchOrganizationResponse({ ...res })));
  };
}

function deleteOrganization(organizationId: string) {
  return (dispatch: OrganizationDispatch) => {
    dispatch(deleteOrganizationRequest({ organizationId }));
    return APIdeleteOrganization(organizationId)
      .then(res => dispatch(deleteOrganizationResponse({ ...res })));
  };
}

const operations = {
  fetchOrganizations,
  createOrganization,
  updateOrganization,
  patchOrganization,
  deleteOrganization,
};

export default operations;
