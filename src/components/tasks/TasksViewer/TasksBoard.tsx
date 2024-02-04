import React from 'react';
import DragList from './DragList/DragList';
import './style.scss';

const TasksBoard = ({
  // onAddTask,
  // onOpenProgressModal,
  // onTaskSelect,
  tasks,
}) => {
  return (
    <DragList
      tasks={tasks}
    />
  );
};

export default TasksBoard;
