import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Table from 'react-bootstrap/Table';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import uniqBy from 'lodash.uniqby';
import ResourcesHandler from 'components/ResourcesHandler';
import ProjectsView from 'components/projects/ProjectsView';
import TasksView from 'components/tasks/TasksView';
import { calculateNotifications } from 'components/notifications/utils';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const NotificationsPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const getPage = () => {
    const notifications = tasks && projects && calculateNotifications(tasks, projects);
    // Projects
    const lateProjects = notifications && notifications.lateProjects;
    const lateProjectsCount = lateProjects?.length;
    // Tasks
    const lateTasks = notifications && notifications.lateTasks;
    const tasksDueAfterProjectDue = notifications && notifications.tasksDueAfterProjectDue;
    const lateTasksCount = lateTasks?.length;
    const tasksDueAfterProjectDueCount = tasksDueAfterProjectDue && tasksDueAfterProjectDue.length;
    // User overloaded with tasks at some point
    const MAX_NB_WORK_HOURS_PER_DAY = 4;
    const allTasksDueInTheFuture = tasks?.filter(t1 => t1.dueAt && t1.status !== 'Completed')
      .sort((a, b) => (a.dueAt! < b.dueAt! ? -1 : 1));
    const uniqueDueDates = uniqBy(allTasksDueInTheFuture, t1 => DateTime.fromISO(t1.dueAt).toISODate())
      .map(t1 => DateTime.fromISO(t1.dueAt).set({ hour: 23, minute: 59, second: 59, millisecond: 999 }));
    const isOverloadedAtSomePoint = uniqueDueDates.find(dueDate => {
      const nbDaysBeforeDate = dueDate.diffNow('days');
      const amountHoursBeforeDate = allTasksDueInTheFuture?.filter(t1 => 
          (DateTime.fromISO(t1.dueAt) <= dueDate && t1.estimatedCompletionTime)
        )
        .map(t1 => t1.estimatedCompletionTime! / 60)
        .reduce((acc, curr) => (acc! + curr!), 0);
      return (amountHoursBeforeDate && nbDaysBeforeDate)
        ? (amountHoursBeforeDate / nbDaysBeforeDate) > MAX_NB_WORK_HOURS_PER_DAY
        : false;
    });

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
                  <tbody>
                    {
                      tasksDueAfterProjectDue
                        .map(({ task, project }) => {
                          return (
                            <tr key={task.id}>
                              <td>{ task && task.description }</td>
                              <td width={140}>{ task && task.dueAt && DateTime.fromISO(task.dueAt).toFormat('yyyy-MM-dd') }</td>
                              <td>{ project && project.name }</td>
                              <td width={140}>{ project && project.dueAt && DateTime.fromISO(project.dueAt).toFormat('yyyy-MM-dd') }</td>
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
            !!isOverloadedAtSomePoint && (
              <>
                <div>
                  Vous avez <b>{isOverloadedAtSomePoint}</b>.
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
