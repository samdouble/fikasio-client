import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import uniqBy from 'lodash.uniqby';
import { DateTime } from 'luxon';
import Datepicker from 'components/UI/Datepicker';
import { operations } from 'services';
import { Task } from 'services/tasks/types';
import AddTaskButton from './AddTaskButton';
import TasksFilters from './TasksFilters/TasksFilters';
import TasksViewer from './TasksViewer/TasksViewer';

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
  filter?: TasksViewFilter;
  onTaskClick: (taskId: string) => void;
  projectId?: string;
  showAddButton?: boolean;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  tasks?: Task[] | null;
}

const TasksView = ({
  filter: pFilter,
  onTaskClick,
  projectId,
  showAddButton,
  showCompletionFilter,
  showDueDateFilter,
  tasks,
}: TasksViewProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [filter, setFilter] = useState<TasksViewFilter>({
    complete: false,
    ...pFilter,
  });
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);

  const addTask = async task => {
    return operations.tasks.createTask(task)(dispatch);
  };

  const handleChangeCompletionFilter = val => {
    if (val === 'ALL') {
      setFilter({
        ...filter,
        archived: false,
        complete: undefined,
        ...pFilter,
      });
    } else if (val === 'COMPLETE') {
      setFilter({
        ...filter,
        archived: false,
        complete: true,
        ...pFilter,
      });
    } else if (val === 'INCOMPLETE') {
      setFilter({
        ...filter,
        archived: false,
        complete: false,
        ...pFilter,
      });
    } else if (val === 'ARCHIVED') {
      setFilter({
        ...filter,
        archived: true,
        complete: undefined,
        ...pFilter,
      });
    }
  };

  const handleChangeDueDateFilter = val => {
    if (val === 'ALL') {
      setFilter({
        ...filter,
        dueAt: undefined,
        ...pFilter,
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
        ...pFilter,
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
        ...pFilter,
      });
    }
  };

  const handleTaskSelect = task => {
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
        filter={filter}
        onAddTask={task => addTask(task)}
        onSelectAllTasks={tasksArray => setSelectedTasks(tasksArray)}
        onTaskClick={onTaskClick}
        onTaskSelect={handleTaskSelect}
        projectId={projectId}
        selectedTasks={selectedTasks}
        tasks={tasks}
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
                () => operations.tasks.deleteManyTasks(
                  selectedTasks
                    .filter(selectedTask => !!selectedTask.id)
                    .map(selectedTask => selectedTask.id!),
                )(dispatch)
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
              <ClickOutside
                onClickOutside={() => setIsDueAtDatepickerOpen(false)}
              >
                <Datepicker
                  defaultValue={
                    allSelectedTasksHaveSameDueAt
                    ? DateTime.fromISO(uniqueDueAtForSelectedTasks[0]).toMillis()
                    : null
                  }
                  isOpen={isDueAtDatepickerOpen}
                  onBlur={() => setIsDueAtDatepickerOpen(false)}
                  onChange={dueAt => {
                    const timestamp = DateTime.fromJSDate(dueAt)
                      .set({ hour: 23, minute: 59, second: 59 })
                      .toISO();
                    const selectedTasksIds = selectedTasks
                      .filter(selectedTask => !!selectedTask.id)
                      .map(selectedTask => selectedTask.id!)
                    operations.tasks.patchManyTasks(selectedTasksIds, { dueAt: timestamp })(dispatch)
                      .then(() => setSelectedTasks([]));
                  }}
                />
              </ClickOutside>
              <FontAwesomeIcon
                icon="calendar-alt"
                size="1x"
                style={{ marginRight: 10 }}
              />
              {
                allSelectedTasksHaveSameDueAt && DateTime.fromISO(uniqueDueAtForSelectedTasks[0]).toFormat('yyyy-MM-dd')
              }
              {
                allSelectedTasksHaveSameDueAt && (
                  <FontAwesomeIcon
                    className="taskRow_dueAt_remove"
                    icon="times"
                    onClick={e => {
                      e.stopPropagation();
                      const selectedTasksIds = selectedTasks
                        .filter(selectedTask => !!selectedTask.id)
                        .map(selectedTask => selectedTask.id!)
                      operations.tasks.patchManyTasks(selectedTasksIds, { dueAt: null })(dispatch)
                        .then(() => setSelectedTasks([]));
                    }}
                    size="1x"
                  />
                )
              }
            </div>
          </div>
        )
      }
    </>
  );
}

export default TasksView;
