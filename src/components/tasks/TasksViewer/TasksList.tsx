import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { Checkbox } from '@fikasio/react-ui-components';
import TaskRow from './TaskRow';
import './style.scss';

const TasksList = ({
  filter,
  onAddTask,
  onOpenProgressModal,
  onSelectAllTasks,
  onTaskClick,
  onTaskSelect,
  projectId,
  selectedTasks,
  tasks,
}) => {
  const { t } = useTranslation();

  const tasksToShow = tasks?.filter(task => (
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
  const allTasksAreChecked = tasksToShow?.length === selectedTasks.length;

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

  return (
    <Table
      bordered
      hover
      responsive
    >
      <thead>
        <tr>
          <th style={{ width: 35 }}>
            {
              tasksToShow?.length
                ? (
                  <Checkbox
                    defaultIsChecked={allTasksAreChecked}
                    onClick={() => {
                      if (allTasksAreChecked) {
                        onSelectAllTasks([]);
                      } else {
                        onSelectAllTasks(tasksToShow);
                      }
                    }}
                  />
                )
                : <div />
            }
          </th>
          <th>{t('description')}</th>
          <th style={{ width: 140 }}>{t('projects')}</th>
          <th style={{ width: 140 }}>{t('status')}</th>
          <th style={{ width: 140 }}>{t('assignee')}</th>
          <th style={{ width: 90 }}>{t('progress')}</th>
          <th style={{ width: 150 }}>{t('deadline')}</th>
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          tasksToShow.sort((t1, t2) => {
              if (!t1.dueAt) return -1;
              if (!t2.dueAt) return 1;
              return t1.dueAt < t2.dueAt ? -1 : 1;
            })
            .map(task => (
              <TaskRow
                isSelected={!!selectedTasks.find(t => task.id === t.id)}
                key={`${task.id}-${task.dueAt}`}
                onAddTask={addTask}
                onClick={onTaskClick}
                onEnterProgress={onOpenProgressModal}
                onSelect={onTaskSelect}
                projectId={projectId}
                task={task}
              />
            ))
        }
      </tbody>
    </Table>
  );
};

export default TasksList;
