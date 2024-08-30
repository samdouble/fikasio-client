import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { Warning } from '@fikasio/react-ui-components';
import TasksView from 'components/tasks/TasksView';
import { calculateOverloadInTheFuture, filterTasks } from 'components/tasks/utils';
import BasePage from 'components/UI/BasePage';
import { setPaneContent } from 'services/pane/slice';
import { useGetTasksQuery } from 'services/tasks/api';
import { round } from 'utils/maths';
import './style.scss';

const HomePage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: tasks } = useGetTasksQuery({});
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

  return (
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
            taskId => dispatch(
              setPaneContent({
                type: 'TASK',
                id: taskId,
              })
            )
          }
          showCompletionFilter
          showViewModeButtons
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
            taskId => dispatch(
              setPaneContent({
                type: 'TASK',
                id: taskId,
              })
            )
          }
          showCompletionFilter
          showViewModeButtons
          tasks={tasksForThisWeek}
        />
      </BasePage>
    </>
  );
}

export default HomePage;
