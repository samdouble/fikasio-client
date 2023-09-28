import { Dispatch } from 'redux';
import {
  getOrganizations as APIgetOrganizations,
  createOrganization as APIcreateOrganization,
  updateOrganization as APIupdateOrganization,
  patchOrganization as APIpatchOrganization,
  deleteOrganization as APIdeleteOrganization,
  getMembers as APIgetMembers,
  createMember as APIcreateMember,
  updateMember as APIupdateMember,
  patchMember as APIpatchMember,
  deleteMember as APIdeleteMember,
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
  createMemberRequest,
  createMemberResponse,
  getMembersRequest,
  getMembersResponse,
  updateMemberRequest,
  updateMemberResponse,
  patchMemberRequest,
  patchMemberResponse,
  deleteMemberRequest,
  deleteMemberResponse,
  OrganizationAction,
} from './actions';
import { Organization, OrganizationMember } from './types';

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

function fetchMembers(filter) {
  return fetchOnceOperation(
    getMembersRequest,
    getMembersResponse,
    APIgetMembers,
    state => state.members,
    [filter],
  );
}

function createMember(organizationId: string, member: OrganizationMember) {
  return (dispatch: OrganizationDispatch) => {
    dispatch(createMemberRequest({ organizationId, member }));
    return APIcreateMember(organizationId, member)
      .then(res => dispatch(createMemberResponse({ organizationId, ...res })));
  };
}

function updateMember(organizationId: string, id: string, member: OrganizationMember) {
  return (dispatch: OrganizationDispatch) => {
    dispatch(updateMemberRequest({ organizationId, id, member }));
    return APIupdateMember(organizationId, id, member)
      .then(res => dispatch(updateMemberResponse({ organizationId, ...res })));
  };
}

function patchMember(organizationId: string, id, member: Partial<OrganizationMember>) {
  return (dispatch: OrganizationDispatch) => {
    dispatch(patchMemberRequest({ organizationId, id, member }));
    return APIpatchMember(organizationId, id, member)
      .then(res => dispatch(patchMemberResponse({ organizationId, ...res })));
  };
}

function deleteMember(organizationId: string, memberId: string) {
  return (dispatch: OrganizationDispatch) => {
    dispatch(deleteMemberRequest({ organizationId, memberId }));
    return APIdeleteMember(organizationId, memberId)
      .then(res => dispatch(deleteMemberResponse({ organizationId, ...res })));
  };
}

const operations = {
  fetchOrganizations,
  createOrganization,
  updateOrganization,
  patchOrganization,
  deleteOrganization,
  members: {
    fetchMembers,
    createMember,
    updateMember,
    patchMember,
    deleteMember,
  },
};

export default operations;
