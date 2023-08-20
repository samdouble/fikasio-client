import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Task } from 'services/tasks/types';
import TasksViewer from './TasksViewer/TasksViewer';
import AddTaskButton from './AddTaskButton';
import TasksCompletionFilter from './TasksCompletionFilter';
import TasksDueDateFilter from './TasksDueDateFilter';

interface TasksViewProps {
  onTaskClick: (taskId: string) => void;
  projectId?: string;
  showAddButton?: boolean;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  tasks?: Task[] | null;
}

const TasksView = ({
  onTaskClick,
  projectId,
  showAddButton,
  showCompletionFilter,
  showDueDateFilter,
  tasks,
}: TasksViewProps) => {
  const [selectedTasks, setSelectedTasks] = useState<Task[]>([]);
  const [showCompleteTasks, setShowCompleteTasks] = useState(false);
  const [showIncompleteTasks, setShowIncompleteTasks] = useState(true);
  const [showArchivedTasks, setShowArchivedTasks] = useState(false);
  const [showOnlyDueToday, setShowOnlyDueToday] = useState(false);
  const [showOnlyDueThisWeek, setShowOnlyDueThisWeek] = useState(false);
  const { t } = useTranslation();

  const handleChangeCompletionFilter = val => {
    if (val === 'ALL') {
      setShowCompleteTasks(true);
      setShowIncompleteTasks(true);
      setShowArchivedTasks(true);
    } else if (val === 'COMPLETE') {
      setShowCompleteTasks(true);
      setShowIncompleteTasks(false);
      setShowArchivedTasks(false);
    } else if (val === 'INCOMPLETE') {
      setShowCompleteTasks(false);
      setShowIncompleteTasks(true);
      setShowArchivedTasks(false);
    } else if (val === 'ARCHIVED') {
      setShowCompleteTasks(false);
      setShowIncompleteTasks(false);
      setShowArchivedTasks(true);
    }
  };

  const handleChangeDueDateFilter = val => {
    if (val === 'ALL') {
      setShowOnlyDueToday(false);
      setShowOnlyDueThisWeek(false);
    } else if (val === 'FOR_TODAY') {
      setShowOnlyDueToday(true);
      setShowOnlyDueThisWeek(false);
    } else if (val === 'FOR_THISWEEK') {
      setShowOnlyDueToday(false);
      setShowOnlyDueThisWeek(true);
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
      {
        showCompletionFilter && (
          <TasksCompletionFilter
            onChange={handleChangeCompletionFilter}
            style={{
              float: 'right',
              ...(showAddButton && { margin: 5 }),
            }}
          />
        )
      }
      {
        showDueDateFilter && (
          <TasksDueDateFilter
            onChange={handleChangeDueDateFilter}
            style={{
              float: 'right',
              ...(showAddButton && { margin: 5, marginRight: 0 }),
            }}
          />
        )
      }
      <TasksViewer
        onTaskClick={onTaskClick}
        onTaskSelect={handleSelectTask}
        projectId={projectId}
        selectedTasks={selectedTasks}
        showCompleteTasks={showCompleteTasks}
        showIncompleteTasks={showIncompleteTasks}
        showArchivedTasks={showArchivedTasks}
        showOnlyDueToday={showOnlyDueToday}
        showOnlyDueThisWeek={showOnlyDueThisWeek}
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
            <div>
              <b>
                {t('xSelectedTasks', { count: selectedTasks.length })}
              </b>
            </div>
          </div>
        )
      }
    </>
  );
}

export default TasksView;
