import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { DatePicker } from '@fikasio/react-ui-components';
import ResourcesHandler from 'components/ResourcesHandler';
import { calculateNotifications } from 'components/notifications/utils';
import ProjectsView from 'components/projects/ProjectsView';
import TasksView from 'components/tasks/TasksView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import { round } from 'utils/maths';
import './style.scss';

const NotificationsPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [isProjectDueAtDatepickerOpen, setIsProjectDueAtDatepickerOpen] = useState(false);
  const [isTaskDueAtDatepickerOpen, setIsTaskDueAtDatepickerOpen] = useState(false);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const getPage = () => {
    const notifications = tasks && projects && calculateNotifications(tasks, projects);
    // Projects
    const lateProjects = notifications?.lateProjects;
    const lateProjectsCount = lateProjects?.length;
    // Tasks
    const lateTasks = notifications?.lateTasks;
    const tasksDueAfterProjectDue = notifications?.tasksDueAfterProjectDue;
    const lateTasksCount = lateTasks?.length;
    const tasksDueAfterProjectDueCount = tasksDueAfterProjectDue?.length;
    const overloadInTheFuture = notifications?.overloadInTheFuture;

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
                <div>
                  Vous avez <b>{lateProjectsCount} projet{lateProjectsCount > 1 && 's'} en retard</b>.
                </div>
                <ProjectsView
                  onProjectClick={projectId => operations.pane.setPaneContent({
                    type: 'PROJECT',
                    id: projectId,
                  })(dispatch)}
                  projects={lateProjects}
                />
              </>
            ) : (
              <div>
                Vous n'avez aucun projet en retard.
              </div>
            )
          }
          {
            lateTasksCount ? (
              <>
                <div>
                  Vous avez <b>{lateTasksCount} tâche{lateTasksCount > 1 && 's'} en retard</b>.
                </div>
                <TasksView
                  onTaskClick={taskId => operations.pane.setPaneContent({
                    type: 'TASK',
                    id: taskId,
                  })(dispatch)}
                  tasks={lateTasks}
                />
              </>
            ) : (
              <div>
                Vous n'avez aucune tâche en retard.
              </div>
            )
          }
          {
            !!tasksDueAfterProjectDueCount && (
              <>
                <div>
                  Vous avez <b>{tasksDueAfterProjectDueCount} tâche{tasksDueAfterProjectDueCount > 1 && 's'} qui sont dûes pour une date postérieure à la fin d'un projet dont elles font partie</b>.
                </div>
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
                                width={150}
                              >
                                <DatePicker
                                  defaultValue={task.dueAt ? DateTime.fromISO(task.dueAt).toJSDate() : null}
                                  displayFormat="yyyy-MM-dd"
                                  isOpen={isProjectDueAtDatepickerOpen}
                                  onChange={dueAt => {
                                    const timestamp = DateTime.fromJSDate(dueAt)
                                      .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                                      .toISO();
                                    operations.tasks.patchTask(task.id, { dueAt: timestamp })(dispatch);
                                  }}
                                  onClose={() => setIsProjectDueAtDatepickerOpen(false)}
                                  shouldCloseOnSelect
                                  showRemoveValue
                                  showTimeSelect={false}
                                />
                              </td>
                              <td>{ project && project.name }</td>
                              <td
                                onClick={() => setIsTaskDueAtDatepickerOpen(true)}
                                width={150}
                              >
                                <DatePicker
                                  defaultValue={project.dueAt ? DateTime.fromISO(project.dueAt).toJSDate() : null}
                                  displayFormat="yyyy-MM-dd"
                                  isOpen={isTaskDueAtDatepickerOpen}
                                  onChange={dueAt => {
                                    const timestamp = DateTime.fromJSDate(dueAt)
                                      .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
                                      .toISO();
                                    operations.projects.patchProject(project.id, { dueAt: timestamp })(dispatch);
                                  }}
                                  onClose={() => setIsTaskDueAtDatepickerOpen(false)}
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
                <div>
                  Vous avez une moyenne de&nbsp;
                  {round(overloadInTheFuture.averageHoursPerDayBeforeDate, 1)}&nbsp;
                  heures par jour à compléter avant le&nbsp;
                  <b>{overloadInTheFuture.date.toISODate()}</b>.
                </div>
              </>
            )
          }
        </BasePage>
      </>
    );
  }

  return (
    <ResourcesHandler
      resources={[tasks, projects]}
      resourceFetchers={[
        () => dispatch(operations.tasks.fetchTasks()),
        () => dispatch(operations.projects.fetchProjects()),
      ]}
      getContents={getPage}
    />
  );
};

export default NotificationsPage;
