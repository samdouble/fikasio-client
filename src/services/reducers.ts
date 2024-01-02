import { combineReducers } from 'redux';
import activities from './activities';
import cards from './cards';
import entities from './entities';
import events from './events';
import items from './items';
import login from './login';
import metrics from './metrics';
import objectives from './objectives';
import organizations from './organizations';
import pane from './pane';
import payments from './payments';
import projects from './projects';
import pendingRequests from './pendingRequests';
import tasks from './tasks';
import templates from './templates';

export default combineReducers({
  activities,
  cards,
  entities,
  events,
  items,
  login,
  metrics,
  objectives,
  organizations,
  pane,
  payments,
  projects,
  pendingRequests,
  tasks,
  templates,
});
