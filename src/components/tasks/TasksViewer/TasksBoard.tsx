import React from 'react';
import DragList from './DragList/DragList';
import './style.scss';

const TasksBoard = ({
  // onAddTask,
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
