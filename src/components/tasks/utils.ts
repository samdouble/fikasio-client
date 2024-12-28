import { DateTime } from 'luxon';
import uniqBy from 'lodash.uniqby';
import { Task } from 'services/tasks/types';

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

const filterTasks = (tasks, filter) => tasks?.filter(task => (
    (filter.complete !== false && task.status === 'Completed' && !task.isArchived)
      || (filter.complete !== true && task.status !== 'Completed' && !task.isArchived)
  ))
  .filter(task => (
    (filter.archived && task.isArchived)
      || (!filter.archived && !task.isArchived)
  ))
  .filter(task => {
    const dueAtGt = filter.dueAt?.$gt && DateTime.fromJSDate(filter.dueAt.$gt);
    const dueAtGte = filter.dueAt?.$gte && DateTime.fromJSDate(filter.dueAt.$gte);
    const dueAtLt = filter.dueAt?.$lt && DateTime.fromJSDate(filter.dueAt.$lt);
    const dueAtLte = filter.dueAt?.$lte && DateTime.fromJSDate(filter.dueAt.$lte);
    const dueAt = task.dueAt && DateTime.fromISO(task.dueAt);
    if (!dueAt) return !filter.dueAt;
    if (dueAtGt && dueAt <= dueAtGt) return false;
    if (dueAtGte && dueAt < dueAtGte) return false;
    if (dueAtLt && dueAt >= dueAtLt) return false;
    if (dueAtLt && dueAt > dueAtLte) return false;
    return true;
  });

const getFirstDueDate = tasks => {
  return tasks
    .reduce((acc, task) => ((acc && task.startAt < acc) ? acc : task.startAt || null), null);
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

const calculateOverloadInTheFuture = (tasks: Task[]) => {
  const MAX_NB_WORK_HOURS_PER_DAY = 4;
  const allTasksDueInTheFuture = tasks?.filter(t1 => t1.dueAt && t1.status !== 'Completed')
    .sort((a, b) => (a.dueAt! < b.dueAt! ? -1 : 1));
  const uniqueDueDates = uniqBy(allTasksDueInTheFuture, t1 => DateTime.fromISO(t1.dueAt).toISODate())
    .map(t1 => DateTime.fromISO(t1.dueAt).set({ hour: 23, minute: 59, second: 59, millisecond: 999 }));

  let isOverloadedInTheFuture: any = null;
  for (const dueDate of uniqueDueDates) {
    const nbDaysBeforeDate = dueDate.diff(
      DateTime.now().set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
      'days',
    ).values.days;
    const amountHoursBeforeDate = allTasksDueInTheFuture?.filter(t1 => 
        (DateTime.fromISO(t1.dueAt) <= dueDate && t1.estimatedCompletionTime)
      )
      .map(t1 => t1.estimatedCompletionTime! / 60)
      .reduce((acc, curr) => (acc! + curr!), 0);
    const averageHoursPerDayBeforeDate = amountHoursBeforeDate
      && nbDaysBeforeDate
      && (amountHoursBeforeDate / nbDaysBeforeDate);
    if (averageHoursPerDayBeforeDate > MAX_NB_WORK_HOURS_PER_DAY) {
      isOverloadedInTheFuture = {
        date: dueDate,
        averageHoursPerDayBeforeDate,
      };
      break;
    }
  }
  return isOverloadedInTheFuture;
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

const calculateTasksWithNoDueDate = tasks => {
  return tasks
    .filter(t => t.status !== 'Completed' && !t.dueAt);
};

export {
  calculateCompleteTime,
  calculateIncompleteTime,
  calculateCompletionPercentage,
  filterTasks,
  getFirstDueDate,
  getFurthestDueDate,
  getLateTasks,
  calculateLatenessRatio,
  calculateOverloadInTheFuture,
  calculateTasksDueTooLate,
  calculateTasksWithNoDueDate,
};
