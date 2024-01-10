import { getLateProjects } from '../projects/utils';
import {
  calculateTasksDueTooLate,
  getLateTasks,
} from '../tasks/utils';

const calculateNotifications = (tasks, projects) => {
  const lateProjects = getLateProjects(projects);
  const lateTasks = getLateTasks(tasks);
  const tasksDueAfterProjectDue = calculateTasksDueTooLate(tasks, projects);
  return {
    lateProjects,
    lateTasks,
    tasksDueAfterProjectDue,
  };
};

export {
  calculateNotifications,
};
