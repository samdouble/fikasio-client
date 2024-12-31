import React from 'react';
import DragList from './DragList/DragList';
import './TasksList.scss';

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
