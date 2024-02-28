import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { Warning } from '@fikasio/react-ui-components';
import ResourcesHandler from 'components/ResourcesHandler';
import TasksView from 'components/tasks/TasksView';
import { calculateOverloadInTheFuture, filterTasks } from 'components/tasks/utils';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import { round } from 'utils/maths';
import './style.scss';

const HomePage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const objectives = useSelector((state: RootState) => state.objectives);
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const tasksForToday = filterTasks(tasks, {
    dueAt: {
      $gte: DateTime.now()
        .set({ hour: 0, minute: 0, second: 0 })
        .toJSDate(),
      $lt: DateTime.now()
        .plus({ days: 1 })
        .set({ hour: 0, minute: 0, second: 0 })
        .toJSDate(),
    },
  });
  const overloadToday = calculateOverloadInTheFuture(tasksForToday);

  const tasksForThisWeek = filterTasks(tasks, {
    dueAt: {
      $gte: DateTime.now()
        .plus({ days: 1 })
        .set({ hour: 0, minute: 0, second: 0 })
        .toJSDate(),
      $lt: DateTime.now()
        .plus({ days: 6 })
        .plus({ days: 1 })
        .set({ hour: 0, minute: 0, second: 0 })
        .toJSDate(),
    },
  });
  const overloadThisWeek = calculateOverloadInTheFuture(tasksForThisWeek);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const getPage = () => (
    <>
      <Helmet>
        <title>{t('home')}</title>
      </Helmet>
      <BasePage>
        <h4>{t('tasksDueForToday')}</h4>
        {
          !!overloadToday && (
            <Warning>
              {
                t('youHaveTooMuchToDoToday', {
                  avgHours: round(overloadToday.averageHoursPerDayBeforeDate, 1),
                })
              }
            </Warning>
          )
        }
        <TasksView
          onTaskClick={
            taskId => operations.pane.setPaneContent({
              type: 'TASK',
              id: taskId,
            })(dispatch)
          }
          showCompletionFilter
          tasks={tasksForToday}
        />
        <h4>{t('tasksDueForThisWeek')}</h4>
        {
          !!overloadThisWeek && (
            <Warning>
              {
                t('youHaveTooMuchToDoNext7Days', {
                  avgHours: round(overloadThisWeek.averageHoursPerDayBeforeDate, 1),
                })
              }
            </Warning>
          )
        }
        <TasksView
          onTaskClick={
            taskId => operations.pane.setPaneContent({
              type: 'TASK',
              id: taskId,
            })(dispatch)
          }
          showCompletionFilter
          tasks={tasksForThisWeek}
        />
      </BasePage>
    </>
  );

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.tasks.fetchTasks()),
        () => dispatch(operations.objectives.fetchObjectives()),
        () => dispatch(operations.projects.fetchProjects()),
      ]}
      resources={[objectives, projects, tasks]}
    />
  );
}

export default HomePage;
