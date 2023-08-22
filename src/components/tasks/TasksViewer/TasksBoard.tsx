import React from 'react';
import { DateTime } from 'luxon';
import { isSameDay, isSameWeek } from 'utils/time';
import DragList from './DragList/DragList';
import './style.scss';

const TasksBoard = ({
  // onAddTask,
  // onOpenProgressModal,
  // onTaskSelect,
  showCompleteTasks,
  showIncompleteTasks,
  showArchivedTasks,
  showOnlyDueToday,
  showOnlyDueThisWeek,
  tasks,
}) => {
  const tasksToShow = tasks
    .filter(task => {
      const isDueToday = task.dueAt && isSameDay(DateTime.now(), DateTime.fromISO(task.dueAt));
      const isDueThisWeek = task.dueAt && isSameWeek(Date.now(), DateTime.fromISO(task.dueAt).toMillis());
      return (
        (
          (showCompleteTasks && task.status === 'Completed' && !task.isArchived)
          || (showIncompleteTasks && task.status !== 'Completed' && !task.isArchived)
          || (showArchivedTasks && task.isArchived)
        )
        && (
          (!showOnlyDueToday && !showOnlyDueThisWeek)
          || (showOnlyDueToday && isDueToday)
          || (showOnlyDueThisWeek && isDueThisWeek)
        )
      );
    });
  return (
    <DragList
      tasks={tasksToShow}
    />
  );
};

export default TasksBoard;
