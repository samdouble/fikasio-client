const home = () => '/home';
const login = () => '/login';
const signup = () => '/signup';
const dashboard = () => '/dashboard';
const entities = () => '/entities';
const entity = id => `/entities/${id}`;
const entityUpsert = () => `/entities/create`;
const itemUpsert = (entityId, itemId) => `/entities/${entityId}/items/${itemId}`;
const notifications = () => '/notifications';
const objectives = () => '/objectives';
const organizations = () => '/organizations';
const organization = id => `/organizations/${id}`;
const projects = () => '/projects';
const settings = () => '/settings';
const tasks = () => '/tasks';
const templates = () => '/templates';
const template = id => `/templates/${id}`;
const templateUpsert = () => `/templates/create`;
const timesheet = (filter: { [key: string]: any; } = {}) => {
  if (filter.date) {
    return `/timesheet?date=${filter.date}`;
  }
  return '/timesheet';
};

const paths = {
  home: home(),
  login: login(),
  signup: signup(),
  dashboard: dashboard(),
  entities: entities(),
  entity: entity(':id'),
  entityUpsert: entityUpsert(),
  itemUpsert: itemUpsert(':entityId', ':itemId'),
  notifications: notifications(),
  objectives: objectives(),
  organizations: organizations(),
  organization: organization(':id'),
  projects: projects(),
  settings: settings(),
  tasks: tasks(),
  templates: templates(),
  template: template(':id'),
  templateUpsert: templateUpsert(),
  timesheet,
};

const links = {
  home,
  login: () => login(),
  signup: () => signup(),
  dashboard: () => dashboard(),
  entities: () => entities(),
  entity: id => entity(id),
  entityUpsert: () => entityUpsert(),
  itemUpsert: (entityId, itemId) => itemUpsert(entityId, itemId),
  notifications: () => notifications(),
  objectives: () => objectives(),
  organizations: () => organizations(),
  organization: id => organization(id),
  projects: () => projects(),
  settings: () => settings(),
  tasks: () => tasks(),
  templates: () => templates(),
  template: id => template(id),
  templateUpsert: () => templateUpsert(),
  timesheet,
  paths,
};

export default links;
