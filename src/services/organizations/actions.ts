import { Organization, OrganizationMember } from './types';

export enum OrganizationActionTypes {
  CREATE_ORGANIZATION_REQUEST = 'CREATE_ORGANIZATION_REQUEST',
  CREATE_ORGANIZATION_RESPONSE = 'CREATE_ORGANIZATION_RESPONSE',
  GET_ORGANIZATIONS_REQUEST = 'GET_ORGANIZATIONS_REQUEST',
  GET_ORGANIZATIONS_RESPONSE = 'GET_ORGANIZATIONS_RESPONSE',
  UPDATE_ORGANIZATION_REQUEST = 'UPDATE_ORGANIZATION_REQUEST',
  UPDATE_ORGANIZATION_RESPONSE = 'UPDATE_ORGANIZATION_RESPONSE',
  PATCH_ORGANIZATION_REQUEST = 'PATCH_ORGANIZATION_REQUEST',
  PATCH_ORGANIZATION_RESPONSE = 'PATCH_ORGANIZATION_RESPONSE',
  DELETE_ORGANIZATION_REQUEST = 'DELETE_ORGANIZATION_REQUEST',
  DELETE_ORGANIZATION_RESPONSE = 'DELETE_ORGANIZATION_RESPONSE',

  CREATE_ORGANIZATION_MEMBER_REQUEST = 'CREATE_ORGANIZATION_MEMBER_REQUEST',
  CREATE_ORGANIZATION_MEMBER_RESPONSE = 'CREATE_ORGANIZATION_MEMBER_RESPONSE',
  GET_ORGANIZATION_MEMBERS_REQUEST = 'GET_ORGANIZATION_MEMBERS_REQUEST',
  GET_ORGANIZATION_MEMBERS_RESPONSE = 'GET_ORGANIZATION_MEMBERS_RESPONSE',
  UPDATE_ORGANIZATION_MEMBER_REQUEST = 'UPDATE_ORGANIZATION_MEMBER_REQUEST',
  UPDATE_ORGANIZATION_MEMBER_RESPONSE = 'UPDATE_ORGANIZATION_MEMBER_RESPONSE',
  PATCH_ORGANIZATION_MEMBER_REQUEST = 'PATCH_ORGANIZATION_MEMBER_REQUEST',
  PATCH_ORGANIZATION_MEMBER_RESPONSE = 'PATCH_ORGANIZATION_MEMBER_RESPONSE',
  DELETE_ORGANIZATION_MEMBER_REQUEST = 'DELETE_ORGANIZATION_MEMBER_REQUEST',
  DELETE_ORGANIZATION_MEMBER_RESPONSE = 'DELETE_ORGANIZATION_MEMBER_RESPONSE',
}

export type OrganizationAction =
  | { type: OrganizationActionTypes.CREATE_ORGANIZATION_REQUEST; payload: { organization: Organization } }
  | { type: OrganizationActionTypes.CREATE_ORGANIZATION_RESPONSE; payload: { organization: Organization } }
  | { type: OrganizationActionTypes.GET_ORGANIZATIONS_REQUEST; payload: { organizations: Organization[] } }
  | { type: OrganizationActionTypes.GET_ORGANIZATIONS_RESPONSE; payload: { organizations: Organization[] } }
  | { type: OrganizationActionTypes.UPDATE_ORGANIZATION_REQUEST; payload: { id: string; organization: Organization } }
  | { type: OrganizationActionTypes.UPDATE_ORGANIZATION_RESPONSE; payload: { organization: Organization } }
  | {
    type: OrganizationActionTypes.PATCH_ORGANIZATION_REQUEST;
    payload: { id: string; organization: Partial<Organization>;
  } }
  | { type: OrganizationActionTypes.PATCH_ORGANIZATION_RESPONSE; payload: { organization: Organization } }
  | { type: OrganizationActionTypes.DELETE_ORGANIZATION_REQUEST; payload: { organizationId: string } }
  | { type: OrganizationActionTypes.DELETE_ORGANIZATION_RESPONSE; payload: { organizationId: string } }

  | {
    type: OrganizationActionTypes.CREATE_ORGANIZATION_MEMBER_REQUEST;
    payload: { organizationId: string; member: OrganizationMember };
  }
  | {
    type: OrganizationActionTypes.CREATE_ORGANIZATION_MEMBER_RESPONSE;
    payload: { organizationId: string; member: OrganizationMember };
  }
  | {
    type: OrganizationActionTypes.GET_ORGANIZATION_MEMBERS_REQUEST;
    payload: { organizationId: string; members: OrganizationMember[]; };
  }
  | {
    type: OrganizationActionTypes.GET_ORGANIZATION_MEMBERS_RESPONSE;
    payload: { organizationId: string; members: OrganizationMember[] };
  }
  | {
    type: OrganizationActionTypes.UPDATE_ORGANIZATION_MEMBER_REQUEST;
    payload: {
      organizationId: string;
      id: string;
      member: OrganizationMember;
    };
  }
  | {
    type: OrganizationActionTypes.UPDATE_ORGANIZATION_MEMBER_RESPONSE;
    payload: { organizationId: string; member: OrganizationMember };
  }
  | {
    type: OrganizationActionTypes.PATCH_ORGANIZATION_MEMBER_REQUEST;
    payload: {
      organizationId: string;
      id: string;
      member: Partial<OrganizationMember>;
    };
  }
  | {
    type: OrganizationActionTypes.PATCH_ORGANIZATION_MEMBER_RESPONSE;
    payload: { organizationId: string; member: OrganizationMember };
  }
  | {
    type: OrganizationActionTypes.DELETE_ORGANIZATION_MEMBER_REQUEST;
    payload: { organizationId: string; memberId: string };
  }
  | {
    type: OrganizationActionTypes.DELETE_ORGANIZATION_MEMBER_RESPONSE;
    payload: { organizationId: string; memberId: string };
  };

export const createOrganizationRequest = (payload: { organization: Organization }): OrganizationAction => ({
  type: OrganizationActionTypes.CREATE_ORGANIZATION_REQUEST,
  payload,
});

export const createOrganizationResponse = (payload: { organization: Organization }): OrganizationAction => ({
  type: OrganizationActionTypes.CREATE_ORGANIZATION_RESPONSE,
  payload,
});

export const getOrganizationsRequest = (payload: { organizations: Organization[] }): OrganizationAction => ({
  type: OrganizationActionTypes.GET_ORGANIZATIONS_REQUEST,
  payload,
});

export const getOrganizationsResponse = (payload: { organizations: Organization[] }): OrganizationAction => ({
  type: OrganizationActionTypes.GET_ORGANIZATIONS_RESPONSE,
  payload,
});

export const updateOrganizationRequest = (payload: { id: string, organization: Organization }): OrganizationAction => ({
  type: OrganizationActionTypes.UPDATE_ORGANIZATION_REQUEST,
  payload,
});

export const updateOrganizationResponse = (payload: { organization: Organization }): OrganizationAction => ({
  type: OrganizationActionTypes.UPDATE_ORGANIZATION_RESPONSE,
  payload,
});

export const patchOrganizationRequest = (payload: {
  id: string,
  organization: Partial<Organization>,
}): OrganizationAction => ({
  type: OrganizationActionTypes.PATCH_ORGANIZATION_REQUEST,
  payload,
});

export const patchOrganizationResponse = (payload: { organization: Organization }): OrganizationAction => ({
  type: OrganizationActionTypes.PATCH_ORGANIZATION_RESPONSE,
  payload,
});

export const deleteOrganizationRequest = (payload: { organizationId: string }): OrganizationAction => ({
  type: OrganizationActionTypes.DELETE_ORGANIZATION_REQUEST,
  payload,
});

export const deleteOrganizationResponse = (payload: { organizationId: string }): OrganizationAction => ({
  type: OrganizationActionTypes.DELETE_ORGANIZATION_RESPONSE,
  payload,
});

export const createMemberRequest = (
  payload: { organizationId: string, member: OrganizationMember },
): OrganizationAction => ({
  type: OrganizationActionTypes.CREATE_ORGANIZATION_MEMBER_REQUEST,
  payload,
});

export const createMemberResponse = (
  payload: { organizationId: string, member: OrganizationMember },
): OrganizationAction => ({
  type: OrganizationActionTypes.CREATE_ORGANIZATION_MEMBER_RESPONSE,
  payload,
});

export const getMembersRequest = (
  payload: { organizationId: string, members: OrganizationMember[] },
): OrganizationAction => ({
  type: OrganizationActionTypes.GET_ORGANIZATION_MEMBERS_REQUEST,
  payload,
});

export const getMembersResponse = (
  payload: { organizationId: string, members: OrganizationMember[] },
): OrganizationAction => ({
  type: OrganizationActionTypes.GET_ORGANIZATION_MEMBERS_RESPONSE,
  payload,
});

export const updateMemberRequest = (payload: {
  organizationId: string,
  id: string,
  member: OrganizationMember,
}): OrganizationAction => ({
  type: OrganizationActionTypes.UPDATE_ORGANIZATION_MEMBER_REQUEST,
  payload,
});

export const updateMemberResponse = (
  payload: { organizationId: string, member: OrganizationMember },
): OrganizationAction => ({
  type: OrganizationActionTypes.UPDATE_ORGANIZATION_MEMBER_RESPONSE,
  payload,
});

export const patchMemberRequest = (payload: {
  organizationId: string,
  id: string,
  member: Partial<OrganizationMember>,
}): OrganizationAction => ({
  type: OrganizationActionTypes.PATCH_ORGANIZATION_MEMBER_REQUEST,
  payload,
});

export const patchMemberResponse = (
  payload: { organizationId: string, member: OrganizationMember },
): OrganizationAction => ({
  type: OrganizationActionTypes.PATCH_ORGANIZATION_MEMBER_RESPONSE,
  payload,
});

export const deleteMemberRequest = (payload: { organizationId: string, memberId: string }): OrganizationAction => ({
  type: OrganizationActionTypes.DELETE_ORGANIZATION_MEMBER_REQUEST,
  payload,
});

export const deleteMemberResponse = (payload: { organizationId: string, memberId: string }): OrganizationAction => ({
  type: OrganizationActionTypes.DELETE_ORGANIZATION_MEMBER_RESPONSE,
  payload,
});
