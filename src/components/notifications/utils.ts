import {
  getLateTasks,
  calculateTasksDueTooLate,
} from '../tasks/utils';

const calculateNotifications = (tasks, projects) => {
  const lateTasks = getLateTasks(tasks);
  const tasksDueAfterProjectDue = calculateTasksDueTooLate(tasks, projects);
  return {
    lateTasks,
    tasksDueAfterProjectDue,
  };
};

export {
  calculateNotifications,
};
