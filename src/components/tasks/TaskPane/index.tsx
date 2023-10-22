import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { AutosaveTextarea } from '@fikasio/react-ui-components';
import { operations } from 'services';
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
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.tasks);
  const task = (tasks || []).find(t => t.id === id);

  return (
    <>
      <AutosaveTextarea
        defaultValue={task?.description}
        onSave={async description => {
          if (task) {
            operations.tasks.patchTask(task.id, {
              description,
            })(dispatch);
          }
        }}
        style={{
          fontSize: 24,
          fontWeight: 'bold',
          height: 40,
          marginBottom: 20,
          padding: 0,
          width: '100%',
        }}
        useContentEditableDiv
      />
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab || 'INFOS'}
      >
        <Tab
          eventKey="INFOS"
          title="Informations"
        >
          <TaskInformationsForm
            onClose={() => dispatch(operations.pane.clearPaneContent())}
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
    </>
  );
};

export default TaskPane;
