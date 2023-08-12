import React, { useState } from 'react';
import { Task } from 'services/tasks/types';
import TasksViewer from './TasksViewer/TasksViewer';
import AddTaskButton from './AddTaskButton';
import TasksCompletionFilter from './TasksCompletionFilter';
import TasksDueDateFilter from './TasksDueDateFilter';

interface TasksViewProps {
  onTaskSelect: (taskId: string) => void;
  projectId?: string;
  showAddButton?: boolean;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  tasks?: Task[] | null;
}

const TasksView = ({
  onTaskSelect,
  projectId,
  showAddButton,
  showCompletionFilter,
  showDueDateFilter,
  tasks,
}: TasksViewProps) => {
  const [showCompleteTasks, setShowCompleteTasks] = useState(false);
  const [showIncompleteTasks, setShowIncompleteTasks] = useState(true);
  const [showArchivedTasks, setShowArchivedTasks] = useState(false);
  const [showOnlyDueToday, setShowOnlyDueToday] = useState(false);
  const [showOnlyDueThisWeek, setShowOnlyDueThisWeek] = useState(false);

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

  return (
    <>
      {
        /*
        <div
          style={{
            position: 'relative',
          }}
        >
          <Button
            onClick={() => undefined}
            style={{
              float: 'right',
            }}
            variant="primary"
          >
            <FontAwesomeIcon
              icon="caret-down"
              size="1x"
            />
          </Button>
          <AddTaskButton
            onClick={onTaskSelect}
            style={{
              float: 'right',
              marginRight: 5,
              position: 'absolute',
              right: 0,
              top: 38,
            }}
          />
        </div>
        */
      }
      {
        showAddButton && (
          <AddTaskButton
            onClick={onTaskSelect}
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
        onTaskSelect={onTaskSelect}
        projectId={projectId}
        showCompleteTasks={showCompleteTasks}
        showIncompleteTasks={showIncompleteTasks}
        showArchivedTasks={showArchivedTasks}
        showOnlyDueToday={showOnlyDueToday}
        showOnlyDueThisWeek={showOnlyDueThisWeek}
        tasks={tasks}
      />
    </>
  );
}

export default TasksView;
