const home = () => '/home';
const login = () => '/login';
const signup = () => '/signup';
const documentation = () => '/docs';
const tos = () => '/tos';
const dashboard = () => '/dashboard';
const entities = () => '/entities';
const entity = id => `/entities/${id}`;
const entityUpsert = () => `/entities/create`;
const itemUpsert = (entityId, itemId) => `/entities/${entityId}/items/${itemId}`;
const metrics = () => '/metrics';
const notifications = () => '/notifications';
const objectives = () => '/objectives';
const projects = () => '/projects';
const settings = () => '/settings';
const tasks = () => '/tasks';
const templates = () => '/templates';
const timesheet = () => '/timesheet';

const paths = {
  home: home(),
  login: login(),
  signup: signup(),
  documentation: documentation(),
  tos: tos(),
  dashboard: dashboard(),
  entities: entities(),
  entity: entity(':id'),
  entityUpsert: entityUpsert(),
  itemUpsert: itemUpsert(':entityId', ':itemId'),
  metrics: metrics(),
  notifications: notifications(),
  objectives: objectives(),
  projects: projects(),
  settings: settings(),
  tasks: tasks(),
  templates: templates(),
  timesheet: timesheet(),
};

const links = {
  home,
  login: () => login(),
  signup: () => signup(),
  documentation: () => documentation(),
  tos: () => tos(),
  dashboard: () => dashboard(),
  entities: () => entities(),
  entity: id => entity(id),
  entityUpsert: () => entityUpsert(),
  itemUpsert: (entityId, itemId) => itemUpsert(entityId, itemId),
  metrics: () => metrics(),
  notifications: () => notifications(),
  objectives: () => objectives(),
  projects: () => projects(),
  settings: () => settings(),
  tasks: () => tasks(),
  templates: () => templates(),
  timesheet: () => timesheet(),
  paths,
};

export default links;
