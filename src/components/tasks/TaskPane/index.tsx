import React from 'react';
import { useSelector } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { RootState } from 'services/store';
import TaskInformationsForm from './TaskInformationsForm';
import TaskDiscussion from './TaskDiscussion';

interface TaskPaneProps {
  defaultTab?: string;
  id: string;
}

const TaskPane = ({
  defaultTab,
  id,
}: TaskPaneProps) => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const task = (tasks || []).find(t => t.id === id);

  return (
    <Tabs
      className="mb-3"
      defaultActiveKey={defaultTab || 'INFOS'}
    >
      <Tab
        eventKey="INFOS"
        title="Informations"
      >
        <TaskInformationsForm
          task={task}
        />
      </Tab>
      <Tab
        eventKey="DISCUSSION"
        title="Discussion"
      >
        {
          task && (
            <TaskDiscussion
              task={task}
            />
          )
        }
      </Tab>
    </Tabs>
  );
};

export default TaskPane;
