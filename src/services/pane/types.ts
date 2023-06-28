import { Activity } from 'services/activities/types';

interface ActivityPane {
  type: 'ACTIVITY';
  activity: Partial<Activity>;
}

interface FieldPane {
  type: 'FIELD';
  entityId: string;
  id: string;
}

export type Pane = {
  type: string;
  id: string;
} | ActivityPane | FieldPane;

export default Pane;
