import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation();
  const tasks = useSelector((state: RootState) => state.tasks);
  const [task, setTask] = useState((tasks || []).find(t1 => t1.id === id));

  return (
    <>
      <AutosaveTextarea
        defaultValue={task?.description}
        onSave={async description => {
          if (task && task.id) {
            operations.tasks.patchTask(task.id, {
              description,
            })(dispatch);
          } else {
            operations.tasks.createTask({
              description,
            })(dispatch)
              .then(resultTask => setTask(resultTask));
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
          title={t('informations')}
        >
          <TaskInformationsForm
            onClose={() => dispatch(operations.pane.clearPaneContent())}
            task={task}
          />
        </Tab>
        <Tab
          eventKey="DISCUSSION"
          title={t('discussion')}
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
