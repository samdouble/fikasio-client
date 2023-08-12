import React from 'react';
import Table from 'react-bootstrap/Table';
import { DateTime } from 'luxon';
import { isSameDay, isSameWeek } from 'utils/time';
import TaskRow from './TaskRow';
import './style.scss';

const TasksList = ({
  onAddTask,
  onOpenProgressModal,
  onTaskSelect,
  projectId,
  showCompleteTasks,
  showIncompleteTasks,
  showArchivedTasks,
  showOnlyDueToday,
  showOnlyDueThisWeek,
  tasks,
}) => {
  const addTask = async task => {
    onAddTask(task)
      .then(resultTask => {
        if (resultTask) {
          const elementsWithClassname = document.getElementsByClassName(resultTask.id!);
          const nbElementsWithClassname = elementsWithClassname.length;
          (elementsWithClassname[nbElementsWithClassname - 1] as HTMLElement).focus();
        }
      });
  };

  return tasks && (
    <Table
      bordered
      hover
      responsive
    >
      <thead />
      <tbody>
        {
          tasks
            .filter(task => {
              const isDueToday = task.dueAt && isSameDay(DateTime.now(), DateTime.fromISO(task.dueAt));
              const isDueThisWeek = task.dueAt && isSameWeek(Date.now(), DateTime.fromISO(task.dueAt).toMillis());
              return (
                (
                  (showCompleteTasks && task.isCompleted && !task.isArchived)
                  || (showIncompleteTasks && !task.isCompleted && !task.isArchived)
                  || (showArchivedTasks && task.isArchived)
                )
                && (
                  (!showOnlyDueToday && !showOnlyDueThisWeek)
                  || (showOnlyDueToday && isDueToday)
                  || (showOnlyDueThisWeek && isDueThisWeek)
                )
              );
            })
            .sort((t1, t2) => {
              if (!t1.dueAt) return -1;
              if (!t2.dueAt) return 1;
              return t1.dueAt < t2.dueAt ? -1 : 1;
            })
            .map(task => (
              <TaskRow
                key={`${task.id}-${task.dueAt}`}
                task={task}
                onAddTask={addTask}
                onEnterProgress={onOpenProgressModal}
                onSelect={onTaskSelect}
                projectId={projectId}
              />
            ))
        }
      </tbody>
    </Table>
  );
};

export default TasksList;
