import { OrganizationAction, OrganizationActionTypes } from './actions';
import { Organization } from './types';

export default function reducer (state: Organization[] | null = null, action: OrganizationAction) {
  switch (action.type) {
    case OrganizationActionTypes.GET_ORGANIZATIONS_RESPONSE:
      return action.payload.organizations;
    case OrganizationActionTypes.CREATE_ORGANIZATION_RESPONSE:
      return (state || []).concat(action.payload.organization);
    case OrganizationActionTypes.UPDATE_ORGANIZATION_RESPONSE:
    case OrganizationActionTypes.PATCH_ORGANIZATION_RESPONSE:
      return state?.map(organization => {
        if (organization.id === action.payload.organization.id) {
          return action.payload.organization;
        }
        return organization;
      });
    case OrganizationActionTypes.DELETE_ORGANIZATION_RESPONSE:
      return state?.filter(organization => organization.id !== action.payload.organizationId);
    default:
      return state;
  }
}
