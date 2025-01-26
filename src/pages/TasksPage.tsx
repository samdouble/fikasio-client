import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import TasksView from 'components/tasks/TasksView';
import BasePage from 'components/UI/BasePage';
import { setPaneContent } from 'services/pane/slice';
import { useGetTasksQuery } from 'services/tasks/api';
import links from 'utils/links';

const TasksPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: tasks } = useGetTasksQuery({});
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

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
            taskId => dispatch(
              setPaneContent({
                type: 'TASK',
                id: taskId,
              })
            )
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

export default TasksPage;
