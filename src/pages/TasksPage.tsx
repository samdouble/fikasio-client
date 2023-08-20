import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import TasksView from 'components/tasks/TasksView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const TasksPage = () => {
  const { t } = useTranslation();
  const metrics = useSelector((state: RootState) => state.metrics);
  const objectives = useSelector((state: RootState) => state.objectives);
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const getPage = () => {
    return (
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{t('tasks')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('tasks')}</h4>
        <TasksView
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
  };

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.tasks.fetchTasks()),
        () => dispatch(operations.metrics.fetchMetrics()),
        () => dispatch(operations.objectives.fetchObjectives()),
        () => dispatch(operations.projects.fetchProjects()),
      ]}
      resources={[tasks, metrics, objectives, projects]}
    />
  );
};

export default TasksPage;
