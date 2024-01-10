import { DateTime } from 'luxon';

const getLateProjects = projects => {
  return projects
    .filter(project => !project.isArchived)
    .filter(project => project.status !== 'Completed' && project.dueAt && DateTime.fromISO(project.dueAt) < DateTime.now());
};

export {
  getLateProjects,
};
