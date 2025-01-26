import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TasksBoard from './TasksBoard';
import TasksList from './TasksList';
import './TasksList.scss';

const TasksViewer = ({
  onAddTask,
  onSelectAllTasks,
  onTaskClick,
  onTaskSelect,
  projectId,
  selectedTasks,
  showViewModeButtons,
  tasks,
}) => {
  const [viewMode, setViewMode] = useState('LIST');

  let taskView;
  if (viewMode === 'BOARD') {
    taskView = (
      <TasksBoard
        // onAddTask={onAddTask}
        // onTaskClick={onTaskClick}
        // onTaskSelect={onTaskSelect}
        // selectedTasks={selectedTasks}
        tasks={tasks}
      />
    );
  } else if (viewMode === 'LIST') {
    taskView = (
      <TasksList
        onAddTask={onAddTask}
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
        showViewModeButtons && (
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
        )
      }
      { taskView }
    </>
  );
};

export default TasksViewer;
