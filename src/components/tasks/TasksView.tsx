import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uniqBy from 'lodash.uniqby';
import { DateTime } from 'luxon';
import { DatePicker } from '@fikasio/react-ui-components';
import { useAddTaskMutation, usePatchManyTasksMutation, useDeleteManyTasksMutation } from 'services/tasks/api';
import { Task } from 'services/tasks/types';
import AddTaskButton from './AddTaskButton';
import TasksFilters from './TasksFilters/TasksFilters';
import TasksViewer from './TasksViewer/TasksViewer';
import { filterTasks } from './utils';

interface TasksViewFilter {
  archived?: boolean;
  complete?: boolean;
  dueAt?: {
    $gt?: string;
    $gte?: string;
    $lt?: string;
    $lte?: string;
  };
}
interface TasksViewProps {
  onTaskClick: (taskId: string) => void;
  projectId?: string;
  showAddButton?: boolean;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  showViewModeButtons?: boolean;
  tasks?: Task[] | null;
}

const TasksView = ({
  onTaskClick,
  projectId,
  showAddButton,
  showCompletionFilter,
  showDueDateFilter,
  showViewModeButtons,
  tasks,
}: TasksViewProps) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<TasksViewFilter>({
    complete: false,
  });
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);

  const [createTask] = useAddTaskMutation();
  const [patchManyTasks] = usePatchManyTasksMutation();
  const [deleteManyTasks] = useDeleteManyTasksMutation();

  const addTask = async task => {
    return createTask(task);
  };

  const handleChangeCompletionFilter = val => {
    if (val === 'ALL') {
      setFilter({
        ...filter,
        archived: false,
        complete: undefined,
      });
    } else if (val === 'COMPLETE') {
      setFilter({
        ...filter,
        archived: false,
        complete: true,
      });
    } else if (val === 'INCOMPLETE') {
      setFilter({
        ...filter,
        archived: false,
        complete: false,
      });
    } else if (val === 'ARCHIVED') {
      setFilter({
        ...filter,
        archived: true,
        complete: undefined,
      });
    }
  };

  const handleChangeDueDateFilter = val => {
    if (val === 'ALL') {
      setFilter({
        ...filter,
        dueAt: undefined,
      });
    } else if (val === 'FOR_TODAY') {
      setFilter({
        ...filter,
        dueAt: {
          $gte: DateTime.now()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
          $lt: DateTime.now()
            .plus({ days: 1 })
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
        },
      });
    } else if (val === 'FOR_THISWEEK') {
      setFilter({
        ...filter,
        dueAt: {
          $gte: DateTime.now()
            .startOf('week')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toJSDate(),
          $lt: DateTime.now()
            .startOf('week')
            .plus({ days: 7 })
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toJSDate(),
        },
      });
    }
  };

  const handleSelectTask = task => {
    const isTaskAlreadySelected = selectedTasks.find(a => a.id === task.id);
    if (isTaskAlreadySelected) {
      setSelectedTasks([
        ...selectedTasks.filter(a => a.id !== task.id),
      ]);
    } else {
      setSelectedTasks([
        ...selectedTasks,
        task,
      ]);
    }
  };

  const uniqueDueAtForSelectedTasks = uniqBy(
    selectedTasks,
    task => task.dueAt ? DateTime.fromISO(task.dueAt).toFormat('yyyy-MM-dd') : null,
  ).map(task => task.dueAt);
  const allSelectedTasksHaveSameDueAt = uniqueDueAtForSelectedTasks.length === 1;

  return (
    <>
      {
        showAddButton && (
          <AddTaskButton
            onClick={onTaskClick}
            showCreateSectionButton={!!projectId}
            style={{
              float: 'right',
              marginRight: -5,
            }}
          />
        )
      }
      <TasksFilters
        onChangeCompletionFilter={handleChangeCompletionFilter}
        onChangeDueDateFilter={handleChangeDueDateFilter}
        showCompletionFilter={showCompletionFilter}
        showDueDateFilter={showDueDateFilter}
      />
      <TasksViewer
        onAddTask={task => addTask(task)}
        onSelectAllTasks={tasksArray => setSelectedTasks(tasksArray)}
        onTaskClick={onTaskClick}
        onTaskSelect={handleSelectTask}
        projectId={projectId}
        selectedTasks={selectedTasks}
        showViewModeButtons={showViewModeButtons}
        tasks={filterTasks(tasks, filter)}
      />
      {
        selectedTasks.length > 0 && (
          <div
            style={{
              backgroundColor: '#7E5B9A',
              bottom: 50,
              color: 'white',
              height: 100,
              left: '22%',
              margin: 'auto',
              padding: 10,
              position: 'fixed',
              width: '60%',
            }}
          >
            <FontAwesomeIcon
              icon="times"
              onClick={() => {
                setSelectedTasks([]);
              }}
              style={{
                cursor: 'pointer',
                marginRight: 10,
                width: 25,
              }}
            />
            <b>
              {t('xSelectedTasks', { count: selectedTasks.length })}
            </b>
            <FontAwesomeIcon
              icon="times"
              onClick={
                () => deleteManyTasks({
                  ids: selectedTasks
                    .filter(selectedTask => !!selectedTask.id)
                    .map(selectedTask => selectedTask.id!),
                })
                  .then(() => setSelectedTasks([]))
              }
              size="1x"
              style={{
                color: '#ce0000',
                cursor: 'pointer',
                marginLeft: 10,
              }}
            />
            <div
              onClick={() => setIsDueAtDatepickerOpen(true)}
              style={{
                cursor: 'pointer',
                width: 150,
              }}
            >
              <DatePicker
                defaultValue={
                  (allSelectedTasksHaveSameDueAt && uniqueDueAtForSelectedTasks[0])
                  ? DateTime.fromISO(uniqueDueAtForSelectedTasks[0]).toJSDate()
                  : null
                }
                isOpen={isDueAtDatepickerOpen}
                onChange={dueAt => {
                  const timestamp = DateTime.fromJSDate(dueAt)
                    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                    .toISO();
                  const selectedTasksIds = selectedTasks
                    .filter(selectedTask => !!selectedTask.id)
                    .map(selectedTask => selectedTask.id!)
                  patchManyTasks({ ids: selectedTasksIds, infos: { dueAt: timestamp }})
                    .then(() => setSelectedTasks([]));
                }}
                onClose={() => setIsDueAtDatepickerOpen(false)}
                onRemoveValue={e => {
                  e.stopPropagation();
                  const selectedTasksIds = selectedTasks
                    .filter(selectedTask => !!selectedTask.id)
                    .map(selectedTask => selectedTask.id!)
                  patchManyTasks({ ids: selectedTasksIds, infos: { dueAt: null }})
                    .then(() => setSelectedTasks([]));
                }}
                shouldCloseOnSelect
                showRemoveValue
                showTimeSelect={false}
              />
            </div>
          </div>
        )
      }
    </>
  );
}

export default TasksView;
