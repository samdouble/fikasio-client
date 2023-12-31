import React from 'react';
import { DateTime } from 'luxon';
import DragList from './DragList/DragList';
import './style.scss';

const TasksBoard = ({
  filter,
  // onAddTask,
  // onOpenProgressModal,
  // onTaskSelect,
  tasks,
}) => {
  const tasksToShow = tasks
    .filter(task => (
      (filter.complete !== false && task.status === 'Completed' && !task.isArchived)
        || (filter.complete !== true && task.status !== 'Completed' && !task.isArchived)
    ))
    .filter(task => (
      (filter.archived && task.isArchived)
        || (!filter.archived && !task.isArchived)
    ))
    .filter(task => {
      const dueAtGt = filter.dueAt.$gt && DateTime.fromJSDate(filter.dueAt.$gt);
      const dueAtGte = filter.dueAt.$gte && DateTime.fromJSDate(filter.dueAt.$gte);
      const dueAtLt = filter.dueAt.$lt && DateTime.fromJSDate(filter.dueAt.$lt);
      const dueAtLte = filter.dueAt.$lte && DateTime.fromJSDate(filter.dueAt.$lte);
      const dueAt = task.dueAt && DateTime.fromISO(task.dueAt);
      if (!dueAt) return false;
      if (dueAtGt && dueAt <= dueAtGt) return false;
      if (dueAtGte && dueAt < dueAtGte) return false;
      if (dueAtLt && dueAt >= dueAtLt) return false;
      if (dueAtLt && dueAt > dueAtLte) return false;
      return true;
    });
  return (
    <DragList
      tasks={tasksToShow}
    />
  );
};

export default TasksBoard;
