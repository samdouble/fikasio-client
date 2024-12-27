import { DateTime } from 'luxon';
import { calculateCompletionPercentage } from '../tasks/utils';

const getLateProjects = (projects, tasks) => {
  return projects
    .filter(project => !project.isArchived)
    .map(project => {
      const projectTasks = tasks?.filter(task => task.projects?.some(p => p.id === project.id));
      const completionRatio = calculateCompletionPercentage(projectTasks);
      return {
        ...project,
        isCompleted: completionRatio === 1,
      };
    })
    .filter(project => !project.isCompleted && project.dueAt && DateTime.fromISO(project.dueAt) < DateTime.now());
};

export {
  getLateProjects,
};
