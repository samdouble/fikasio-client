import { getLateProjects } from 'components/projects/utils';
import {
  calculateOverloadInTheFuture,
  calculateTasksDueTooLate,
  calculateTasksWithNoDueDate,
  getLateTasks,
} from 'components/tasks/utils';

const calculateNotifications = (tasks, projects) => {
  // Errors
  const lateProjects = getLateProjects(projects, tasks);
  const lateTasks = getLateTasks(tasks);

  // Warnings
  const overloadInTheFuture = calculateOverloadInTheFuture(tasks);
  const tasksDueAfterProjectDue = calculateTasksDueTooLate(tasks, projects);
  const tasksWithNoDueDate = calculateTasksWithNoDueDate(tasks);
  return {
    overloadInTheFuture,
    lateProjects,
    lateTasks,
    tasksDueAfterProjectDue,
    tasksWithNoDueDate,
  };
};

export {
  calculateNotifications,
};
