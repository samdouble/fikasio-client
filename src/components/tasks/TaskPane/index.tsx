import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'services/store';
import TaskInformationsForm from './TaskInformationsForm';

const TaskPane = ({
  id,
}) => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const task = (tasks || []).find(t => t.id === id);

  return (
    <TaskInformationsForm
      task={task}
    />
  );
};

export default TaskPane;
