import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { Checkbox } from '@fikasio/react-ui-components';
import TaskRow from './TaskRow';
import './TasksList.scss';

const TasksList = ({
  onAddTask,
  onSelectAllTasks,
  onTaskClick,
  onTaskSelect,
  projectId,
  selectedTasks,
  tasks,
}) => {
  const { t } = useTranslation();

  const allTasksAreChecked = !!tasks?.length
    && (tasks?.length === selectedTasks.length);

  const addTask = async task => {
    onAddTask(task)
      .then(async ({ data: resultTask }) => {
        if (resultTask) {
          await new Promise(resolve => setTimeout(resolve, 200));
          const elementsWithClassname = document.getElementsByClassName(resultTask.id);
          const nbElementsWithClassname = elementsWithClassname.length;
          if (nbElementsWithClassname) {
            (elementsWithClassname[nbElementsWithClassname - 1] as HTMLElement).focus();
          }
        }
      });
  };

  return (
    <Table
      bordered
      hover
      responsive
      style={{
        overflowX: 'scroll',
      }}
    >
      <thead>
        <tr>
          <th
            style={{ width: 35 }}
          >
            <Checkbox
              isChecked={allTasksAreChecked}
              onClick={() => {
                if (allTasksAreChecked) {
                  onSelectAllTasks([]);
                } else {
                  onSelectAllTasks(tasks);
                }
              }}
            />
          </th>
          <th style={{ minWidth: 500 }}>{t('description')}</th>
          <th style={{ minWidth: 150 }}>{t('projects')}</th>
          <th style={{ minWidth: 140 }}>{t('status')}</th>
          <th style={{ minWidth: 90 }}>{t('progress')}</th>
          <th style={{ minWidth: 120 }}>{t('deadline')}</th>
          <th style={{ width: 30 }} />
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          (!tasks || !tasks.length)
            && (
              <TaskRow
                onAddTask={addTask}
                onClick={onTaskClick}
                onSelect={onTaskSelect}
                projectId={projectId}
                task={{
                  dueAt: DateTime.now()
                    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                    .toISO(),
                }}
              />
            )
        }
        {
          tasks?.sort((t1, t2) => {
              if (!t1.dueAt) return -1;
              if (!t2.dueAt) return 1;
              return t1.dueAt < t2.dueAt ? -1 : 1;
            })
            .map(task => (
              <TaskRow
                isSelected={!!selectedTasks.find(t1 => task.id === t1.id)}
                key={`${task.id}-${task.dueAt}`}
                onAddTask={addTask}
                onClick={onTaskClick}
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
