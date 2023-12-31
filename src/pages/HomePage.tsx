import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import ResourcesHandler from 'components/ResourcesHandler';
import TasksView from 'components/tasks/TasksView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import './style.scss';

const HomePage = () => {
  const { t } = useTranslation();
  const metrics = useSelector((state: RootState) => state.metrics);
  const objectives = useSelector((state: RootState) => state.objectives);
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const getPage = () => (
    <BasePage>
      <h4>{t('tasks')}</h4>
      <TasksView
        filter={{
          dueAt: {
            $gte: DateTime.now()
              .set({ hour: 0, minute: 0, second: 0 })
              .toJSDate(),
            $lt: DateTime.now()
              .plus({ days: 1 })
              .set({ hour: 0, minute: 0, second: 0 })
              .toJSDate(),
          },
        }}
        onTaskClick={
          taskId => operations.pane.setPaneContent({
            type: 'TASK',
            id: taskId,
          })(dispatch)
        }
        showAddButton
        showCompletionFilter
        showDueDateFilter
        tasks={tasks}
      />
    </BasePage>
  );

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.tasks.fetchTasks()),
        () => dispatch(operations.metrics.fetchMetrics()),
        () => dispatch(operations.objectives.fetchObjectives()),
        () => dispatch(operations.projects.fetchProjects()),
      ]}
      resources={[metrics, objectives, projects, tasks]}
    />
  );
}

export default HomePage;
