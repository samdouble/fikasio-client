import { DateTime } from 'luxon';

const calculateAverageCompletionTime = tasks => {
  const tasksWithNonNullEstimatedCompletionTime = tasks?.filter(task => task.estimatedCompletionTime);
  if (!tasksWithNonNullEstimatedCompletionTime || tasksWithNonNullEstimatedCompletionTime.length === 0) {
    return null;
  }
  return (tasksWithNonNullEstimatedCompletionTime
    .reduce((acc, task) => (acc + task.estimatedCompletionTime), 0)) / tasksWithNonNullEstimatedCompletionTime.length;
};

const calculateCompleteTime = tasks => {
  const complete = tasks.filter(task => task.status === 'Completed');
  const averageEstimatedCompletionTime = calculateAverageCompletionTime(tasks);
  return complete
    .reduce((acc, task) => (acc + (task.estimatedCompletionTime || averageEstimatedCompletionTime)), 0);
};

const calculateIncompleteTime = tasks => {
  const incomplete = tasks?.filter(task => task.status !== 'Completed');
  const averageEstimatedCompletionTime = calculateAverageCompletionTime(tasks);
  return incomplete?.reduce((acc, task) => (acc + (task.estimatedCompletionTime || averageEstimatedCompletionTime)), 0);
};

const calculateCompletionPercentage = tasks => {
  if (!tasks || tasks.length === 0) {
    return null;
  }
  const complete = tasks.filter(task => task.status === 'Completed');
  const incomplete = tasks.filter(task => task.status !== 'Completed');
  const tasksWithNonNullEstimatedCompletionTime = tasks.filter(task => task.estimatedCompletionTime);
  if (tasksWithNonNullEstimatedCompletionTime.length === 0) {
    return complete.length / (complete.length + incomplete.length);
  }
  const completeTime = calculateCompleteTime(tasks);
  const incompleteTime = calculateIncompleteTime(tasks);
  return completeTime / (completeTime + incompleteTime);
};

const getFurthestDueDate = tasks => {
  return tasks
    .reduce((acc, task) => ((acc && acc < task.dueAt) ? acc : task.dueAt || null), null);
};

const getLateTasks = tasks => {
  return tasks
    .filter(task => !task.isArchived)
    .filter(task => task.status !== 'Completed' && task.dueAt && DateTime.fromISO(task.dueAt) < DateTime.now());
};

const calculateLatenessRatio = tasks => {
  if (tasks.length === 0) {
    return null;
  }

  // TODO
  /*
  const hasdueAtPassed = task
    && task.status !== 'Completed'
    && task.dueAt && DateTime.fromISO(task.dueAt) < DateTime.now();

  const tasksWithNonNullDueAt = tasks.filter(task => task.dueAt);

  const complete = tasks.filter(task => task.status === 'Completed');
  const incomplete = tasks.filter(task => task.status !== 'Completed');
  if (tasksWithNonNullEstimatedCompletionTime.length === 0) {
    return complete.length / (complete.length + incomplete.length);
  }
  const averageEstimatedCompletionTime = (tasksWithNonNullEstimatedCompletionTime
    .reduce((acc, task) => (acc + task.estimatedCompletionTime), 0)) / tasksWithNonNullEstimatedCompletionTime.length;
  const completeTime = complete
    .reduce((acc, task) => (acc + (task.estimatedCompletionTime || averageEstimatedCompletionTime)), 0);
  const incompleteTime = incomplete
    .reduce((acc, task) => (acc + (task.estimatedCompletionTime || averageEstimatedCompletionTime)), 0);
  return completeTime / (completeTime + incompleteTime);
  */
};

const calculateTasksDueTooLate = (tasks, projects) => {
  const tasksDueTooLate = tasks
    .map(t => {
      const taskProjects = (t.projects || [])
        .map(({ id }) => projects.find(p => p.id === id));
      const projectsDueBefore = taskProjects.filter(p => t.dueAt && p.dueAt && p.dueAt < t.dueAt);
      return {
        ...t,
        projectsDueBefore,
      };
    })
    .filter(t => t.projectsDueBefore.length);
  return tasksDueTooLate
    .reduce((acc, task) => ([
      ...acc,
      ...task.projectsDueBefore
        .map(p => ({
          task,
          project: p,
        })),
    ]), []);
};

export {
  calculateCompleteTime,
  calculateIncompleteTime,
  calculateCompletionPercentage,
  getFurthestDueDate,
  getLateTasks,
  calculateLatenessRatio,
  calculateTasksDueTooLate,
};
