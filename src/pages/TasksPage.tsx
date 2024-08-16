import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import TasksView from 'components/tasks/TasksView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
// import { useGetTasksQuery } from 'services/tasks/newEndpoints';
import links from 'utils/links';
import './style.scss';

const TasksPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const objectives = useSelector((state: RootState) => state.objectives);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  /*
  const { data, isFetching } = useGetTasksQuery({});
  console.log(isFetching, data);
  useEffect(() => {
  }, [isFetching]);
  */

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const getPage = () => {
    return (
      <>
        <Helmet>
          <title>{t('tasks')}</title>
        </Helmet>
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
            showViewModeButtons
            tasks={tasks}
          />
        </BasePage>
      </>
    );
  };

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.tasks.fetchTasks()),
        () => dispatch(operations.objectives.fetchObjectives()),
      ]}
      resources={[tasks, objectives]}
    />
  );
};

export default TasksPage;
