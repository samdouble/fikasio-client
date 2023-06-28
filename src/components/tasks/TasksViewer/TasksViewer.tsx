import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';
import TasksBoard from './TasksBoard';
import TasksList from './TasksList';
import ProgressModal from '../ProgressModal';
import './style.scss';

const TasksViewer = ({
  onTaskSelect,
  projectId,
  showCompleteTasks,
  showIncompleteTasks,
  showArchivedTasks,
  showOnlyDueToday,
  showOnlyDueThisWeek,
  tasks,
}) => {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [viewMode, setViewMode] = useState('LIST');
  const dispatch = useDispatch();

  const addTask = async task => {
    return operations.tasks.createTask(task)(dispatch);
  };

  const handleOpenProgressModal = task => {
    setShowProgressModal(true);
    setEditedTask(task);
  };

  const handleCloseProgressModal = () => {
    setShowProgressModal(false);
    setEditedTask(null);
  };

  let taskView;
  if (viewMode === 'BOARD') {
    taskView = <TasksBoard
      // onAddTask={task => addTask(task)}
      // onOpenProgressModal={task => handleOpenProgressModal(task)}
      // onTaskSelect={onTaskSelect}
      showCompleteTasks={showCompleteTasks}
      showIncompleteTasks={showIncompleteTasks}
      showArchivedTasks={showArchivedTasks}
      showOnlyDueToday={showOnlyDueToday}
      showOnlyDueThisWeek={showOnlyDueThisWeek}
      tasks={tasks}
    />
  } else if (viewMode === 'LIST') {
    taskView = <TasksList
      onAddTask={task => addTask(task)}
      onOpenProgressModal={task => handleOpenProgressModal(task)}
      onTaskSelect={onTaskSelect}
      showCompleteTasks={showCompleteTasks}
      showIncompleteTasks={showIncompleteTasks}
      showArchivedTasks={showArchivedTasks}
      showOnlyDueToday={showOnlyDueToday}
      showOnlyDueThisWeek={showOnlyDueThisWeek}
      projectId={projectId}
      tasks={tasks}
    />
  } else {
    taskView = null;
  }

  return tasks && (
    <>
      {
        showProgressModal && <ProgressModal
          isOpen={showProgressModal}
          onClose={() => handleCloseProgressModal()}
          task={editedTask}
        />
      }
      <div style={{ textAlign: 'left' }}>
        <Button
          variant="outline-secondary"
          active={viewMode === 'LIST'}
          onClick={() => setViewMode('LIST')}
        >
          <FontAwesomeIcon icon="list" size="1x" />
        </Button>
        <Button
          active={viewMode === 'BOARD'}
          variant="outline-secondary"
          onClick={() => setViewMode('BOARD')}
        >
          <FontAwesomeIcon icon="th" size="1x" />
        </Button>
      </div>
      { taskView }
    </>
  );
};

export default TasksViewer;
