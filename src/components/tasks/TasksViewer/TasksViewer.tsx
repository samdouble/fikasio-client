import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TasksBoard from './TasksBoard';
import TasksList from './TasksList';
import ProgressModal from '../ProgressModal';
import './style.scss';

const TasksViewer = ({
  filter,
  onAddTask,
  onSelectAllTasks,
  onTaskClick,
  onTaskSelect,
  projectId,
  selectedTasks,
  tasks,
}) => {
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [viewMode, setViewMode] = useState('LIST');

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
    taskView = (
      <TasksBoard
        filter={filter}
        // onAddTask={onAddTask}
        // onOpenProgressModal={task => handleOpenProgressModal(task)}
        // onTaskClick={onTaskClick}
        // onTaskSelect={onTaskSelect}
        // selectedTasks={selectedTasks}
        tasks={tasks}
      />
    );
  } else if (viewMode === 'LIST') {
    taskView = (
      <TasksList
        filter={filter}
        onAddTask={onAddTask}
        onOpenProgressModal={task => handleOpenProgressModal(task)}
        onSelectAllTasks={onSelectAllTasks}
        onTaskClick={onTaskClick}
        onTaskSelect={onTaskSelect}
        projectId={projectId}
        selectedTasks={selectedTasks}
        tasks={tasks}
      />
    );
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
          active={viewMode === 'LIST'}
          onClick={() => setViewMode('LIST')}
          variant="outline-secondary"
        >
          <FontAwesomeIcon icon="list" size="1x" />
        </Button>
        <Button
          active={viewMode === 'BOARD'}
          onClick={() => setViewMode('BOARD')}
          variant="outline-secondary"
        >
          <FontAwesomeIcon icon="th" size="1x" />
        </Button>
      </div>
      { taskView }
    </>
  );
};

export default TasksViewer;
