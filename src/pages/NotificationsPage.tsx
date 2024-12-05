import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { DatePicker, Error, Warning } from '@fikasio/react-ui-components';
import { calculateNotifications } from 'components/notifications/utils';
import ProjectsView from 'components/projects/ProjectsView';
import TasksView from 'components/tasks/TasksView';
import BasePage from 'components/UI/BasePage';
import { setPaneContent } from 'services/pane/slice';
import { useGetProjectsQuery, usePatchProjectMutation } from 'services/projects/api';
import { useGetTasksQuery, usePatchTaskMutation } from 'services/tasks/api';
import links from 'utils/links';
import { round } from 'utils/maths';
import './style.scss';

const NotificationsPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const { data: projects } = useGetProjectsQuery();
  const { data: tasks } = useGetTasksQuery({});
  const [isProjectDueAtDatepickerOpen, setIsProjectDueAtDatepickerOpen] = useState(false);

  const [patchProject] = usePatchProjectMutation();
  const [patchTask] = usePatchTaskMutation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const notifications = tasks && projects && calculateNotifications(tasks, projects);
  // Projects
  const lateProjects = notifications?.lateProjects;
  const lateProjectsCount = lateProjects?.length;
  // Tasks
  const lateTasks = notifications?.lateTasks;
  const tasksDueAfterProjectDue = notifications?.tasksDueAfterProjectDue;
  const tasksWithNoDueDate = notifications?.tasksWithNoDueDate;
  const lateTasksCount = lateTasks?.length;
  const overloadInTheFuture = notifications?.overloadInTheFuture;
  const tasksDueAfterProjectDueCount = tasksDueAfterProjectDue?.length;
  const tasksWithNoDueDateCount = tasksWithNoDueDate?.length;

  return (
    <>
      <Helmet>
        <title>{t('notifications')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{t('notifications')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('notifications')}</h4>
        {
          lateProjectsCount ? (
            <>
              <Error>
                {t('youHaveXOverdueProjects', { count: lateProjectsCount })}
              </Error>
              <ProjectsView
                onProjectClick={
                  projectId => dispatch(
                    setPaneContent({
                      type: 'PROJECT',
                      id: projectId,
                    })
                  )
                }
                projects={lateProjects}
              />
            </>
          ) : (
            <div>
              {t('youHaveNoOverdueProjects')}
            </div>
          )
        }
        {
          lateTasksCount ? (
            <>
              <Error>
                {t('youHaveXOverdueTasks', { count: lateTasksCount })}
              </Error>
              <TasksView
                onTaskClick={
                  taskId => dispatch(
                    setPaneContent({
                      type: 'TASK',
                      id: taskId,
                    })
                  )
                }
                tasks={lateTasks}
              />
            </>
          ) : (
            <div>
              {t('youHaveNoOverdueTasks')}
            </div>
          )
        }
        {
          !!tasksWithNoDueDateCount && (
            <>
              <Warning>
                {t('youHaveXTasksWithNoDueDate', { count: tasksWithNoDueDateCount })}
              </Warning>
              <TasksView
                onTaskClick={
                  taskId => dispatch(
                    setPaneContent({
                      type: 'TASK',
                      id: taskId,
                    })
                  )
                }
                tasks={tasksWithNoDueDate}
              />
            </>
          )
        }
        {
          !!tasksDueAfterProjectDueCount && (
            <>
              <Warning>
                Vous avez <b>{tasksDueAfterProjectDueCount} tâche{tasksDueAfterProjectDueCount > 1 && 's'} qui sont dûes pour une date postérieure à la fin d'un projet dont elles font partie</b>.
              </Warning>
              <Table
                bordered
                hover
                responsive
              >
                <thead>
                  <tr>
                    <th>{t('task')}</th>
                    <th style={{ width: 150 }}>{t('dueDate')}</th>
                    <th>{t('project')}</th>
                    <th style={{ width: 150 }}>{t('dueDate')}</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    tasksDueAfterProjectDue
                      .map(({ task, project }) => {
                        return (
                          <tr key={task.id}>
                            <td>{ task && task.description }</td>
                            <td
                              onClick={() => setIsProjectDueAtDatepickerOpen(true)}
                              style={{
                                minWidth: 150,
                              }}
                            >
                              <DatePicker
                                defaultValue={task.dueAt ? DateTime.fromISO(task.dueAt).toJSDate() : null}
                                displayFormat="yyyy-MM-dd"
                                isOpen={isProjectDueAtDatepickerOpen}
                                onChange={dueAt => {
                                  const timestamp = DateTime.fromJSDate(dueAt)
                                    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                                    .toISO();
                                  patchTask({
                                    id: task.id,
                                    dueAt: timestamp,
                                  });
                                }}
                                onClose={() => setIsProjectDueAtDatepickerOpen(false)}
                                shouldCloseOnSelect
                                showRemoveValue
                                showTimeSelect={false}
                              />
                            </td>
                            <td>{ project && project.name }</td>
                            <td
                              style={{
                                minWidth: 150,
                              }}
                            >
                              <DatePicker
                                defaultValue={project.dueAt ? DateTime.fromISO(project.dueAt).toJSDate() : null}
                                displayFormat="yyyy-MM-dd"
                                onChange={dueAt => {
                                  const timestamp = DateTime.fromJSDate(dueAt)
                                    .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                                    .toISO();
                                  patchProject({
                                    id: project.id,
                                    dueAt: timestamp,
                                  });
                                }}
                                shouldCloseOnSelect
                                showRemoveValue
                                showTimeSelect={false}
                              />
                            </td>
                          </tr>
                        );
                      })
                  }
                </tbody>
              </Table>
            </>
          )
        }
        {
          !!overloadInTheFuture && (
            <>
              <Warning>
                {
                  t('youHaveTooMuchToDo', {
                    avgHours: round(overloadInTheFuture.averageHoursPerDayBeforeDate, 1),
                    date: overloadInTheFuture.date.toISODate(),
                  })
                }
              </Warning>
            </>
          )
        }
      </BasePage>
    </>
  );
};

export default NotificationsPage;
