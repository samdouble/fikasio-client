import { getLateProjects } from '../projects/utils';
import {
  calculateOverloadInTheFuture,
  calculateTasksDueTooLate,
  getLateTasks,
} from '../tasks/utils';

const calculateNotifications = (tasks, projects) => {
  const overloadInTheFuture = calculateOverloadInTheFuture(tasks);
  const lateProjects = getLateProjects(projects, tasks);
  const lateTasks = getLateTasks(tasks);
  const tasksDueAfterProjectDue = calculateTasksDueTooLate(tasks, projects);
  return {
    overloadInTheFuture,
    lateProjects,
    lateTasks,
    tasksDueAfterProjectDue,
  };
};

export {
  calculateNotifications,
};
