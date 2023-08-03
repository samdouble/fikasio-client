import { Activity } from 'services/activities/types';

interface ActivityPane {
  type: 'ACTIVITY';
  activity: Partial<Activity>;
}

interface EntityFieldPane {
  type: 'ENTITY_FIELD';
  entityId: string;
  id: string;
}

interface TemplateFieldPane {
  type: 'TEMPLATE_FIELD';
  templateId: string;
  id: string;
}

export type Pane = {
  type: string;
  id: string;
} | ActivityPane | EntityFieldPane | TemplateFieldPane;

export default Pane;
