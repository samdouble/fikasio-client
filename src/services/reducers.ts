import { combineReducers } from 'redux';
import activities from './activities';
import entities from './entities';
import events from './events';
import items from './items';
import login from './login';
import metrics from './metrics';
import objectives from './objectives';
import pane from './pane';
import payments from './payments';
import projects from './projects';
import pendingRequests from './pendingRequests';
import tasks from './tasks';
import templates from './templates';

export default combineReducers({
  activities,
  entities,
  events,
  items,
  login,
  metrics,
  objectives,
  pane,
  payments,
  projects,
  pendingRequests,
  tasks,
  templates,
});
