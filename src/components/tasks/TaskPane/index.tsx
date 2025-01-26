import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';
import { AutosaveTextarea } from '@fikasio/react-ui-components';
import { clearPaneContent } from 'services/pane/slice';
import { useGetTasksQuery, useAddTaskMutation, usePatchTaskMutation } from 'services/tasks/api';
import TaskDiscussion from './TaskDiscussion';
import TaskHistory from './TaskHistory';
import TaskInformationsForm from './TaskInformationsForm';

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
  const { data: tasks } = useGetTasksQuery({});
  const [task, setTask] = useState((tasks || []).find(t1 => t1.id === id));

  const [createTask] = useAddTaskMutation();
  const [patchTask] = usePatchTaskMutation();

  return (
    <>
      <AutosaveTextarea
        defaultValue={task?.description}
        onSave={async description => {
          if (task && task.id) {
            patchTask({
              id: task.id,
              description,
            });
          } else {
            createTask({
              description,
            })
              .then(({ data }) => {
                if (data) {
                  setTask(data);
                }
              });
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
            onClose={() => dispatch(clearPaneContent())}
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
        <Tab
          eventKey="HISTORY"
          title={t('history')}
        >
          {
            task && (
              <TaskHistory
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
