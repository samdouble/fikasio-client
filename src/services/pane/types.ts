import { Activity } from 'services/activities/types';

export interface IActivityPane {
  type: 'ACTIVITY';
  activity: Partial<Activity>;
}

export interface IEntityFieldPane {
  type: 'ENTITY_FIELD';
  entityId: string;
  id: string;
}

export interface IOrganizationMemberPane {
  type: 'ORGANIZATION_MEMBER';
  organizationId: string;
  id: string;
}

export interface ITemplateFieldPane {
  type: 'TEMPLATE_FIELD';
  templateId: string;
  id: string;
}

export type Pane = {
  type: string;
  id: string;
} | IActivityPane | IEntityFieldPane | IOrganizationMemberPane | ITemplateFieldPane;

export default Pane;
