import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import { operations } from 'services';
import { RootState } from 'services/store';
import NotificationsCounter from '../notifications/NotificationsCounter';
import ResourcesHandler from '../ResourcesHandler';
import { calculateNotifications } from '../notifications/utils';
import '@trendmicro/react-sidenav/dist/react-sidenav.css';

const menuItems = {
  DASHBOARD: 'dashboard',
  ENTITIES: 'entities',
  METRICS: 'metrics',
  NOTIFICATIONS: 'notifications',
  OBJECTIVES: 'objectives',
  ORGANIZATIONS: 'organizations',
  PROJECTS: 'projects',
  TASKS: 'tasks',
  TIMESHEET: 'timesheet',
};

const Sidebar = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const notifications = tasks && projects && calculateNotifications(tasks, projects);
  const lateTasks = notifications && notifications.lateTasks;
  const tasksDueAfterProjectDue = notifications && notifications.tasksDueAfterProjectDue;
  const notificationsCount = (lateTasks && lateTasks.length)
    + (tasksDueAfterProjectDue && tasksDueAfterProjectDue.length);

  const getDefaultSelectedMenuItem = () => {
    if (location.pathname === '/dashboard') return menuItems.DASHBOARD;
    if (location.pathname === '/objectives') return menuItems.OBJECTIVES;
    if (location.pathname === '/organizations') return menuItems.ORGANIZATIONS;
    if (location.pathname === '/metrics') return menuItems.METRICS;
    if (location.pathname === '/tasks') return menuItems.TASKS;
    if (location.pathname === '/projects') return menuItems.PROJECTS;
    if (location.pathname === '/timesheet') return menuItems.TIMESHEET;
    if (location.pathname === '/notifications') return menuItems.NOTIFICATIONS;
    return null;
  };

  const getPage = () => {
    return (
      <ClickOutside
        onClickOutside={() => {
          setExpanded(false);
        }}
      >
        <SideNav
          expanded={expanded}
          onSelect={selected => {
            const to = `/${selected}`;
            if (location.pathname !== to) {
              history.push(to);
            }
          }}
          onToggle={expanded => setExpanded(expanded)}
          style={{
            position: 'fixed',
            top: 60,
            backgroundColor: '#7E5B9A',
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected={getDefaultSelectedMenuItem() || menuItems.DASHBOARD}>
            <NavItem
              data-tooltip-id="dashboard"
              data-tooltip-content={t('dashboard')}
              eventKey={menuItems.DASHBOARD}
            >
              <NavIcon>
                <Tooltip id="dashboard" />
                <FontAwesomeIcon
                  icon="chart-bar"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('dashboard')}
              </NavText>
            </NavItem>
            <NavItem
              data-tooltip-id="projects"
              data-tooltip-content={t('projects')}
              eventKey={menuItems.PROJECTS}
            >
              <NavIcon>
                <Tooltip id="projects" />
                <FontAwesomeIcon
                  icon="project-diagram"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('projects')}
              </NavText>
            </NavItem>
            <NavItem
              data-tooltip-id="objectives"
              data-tooltip-content={t('objectives')}
              eventKey={menuItems.OBJECTIVES}
            >
              <NavIcon>
                <Tooltip id="objectives" />
                <FontAwesomeIcon
                  icon="bullseye"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('objectives')}
              </NavText>
            </NavItem>
            <NavItem
              data-tooltip-id="tasks"
              data-tooltip-content={t('tasks')}
              eventKey={menuItems.TASKS}
            >
              <NavIcon>
                <Tooltip id="tasks" />
                <FontAwesomeIcon
                  icon="check-square"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('tasks')}
              </NavText>
            </NavItem>
            <NavItem
              data-tooltip-id="entities"
              data-tooltip-content={t('entities')}
              eventKey={menuItems.ENTITIES}
            >
              <NavIcon>
                <Tooltip id="entities" />
                <FontAwesomeIcon
                  icon="shapes"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('entities')}
              </NavText>
            </NavItem>
            <NavItem
              data-tooltip-id="metrics"
              data-tooltip-content={t('metrics')}
              eventKey={menuItems.METRICS}
            >
              <NavIcon>
                <Tooltip id="metrics" />
                <FontAwesomeIcon
                  icon="ruler"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('metrics')}
              </NavText>
            </NavItem>
            <NavItem
              data-tooltip-id="timesheet"
              data-tooltip-content={t('timesheet')}
              eventKey={menuItems.TIMESHEET}
            >
              <NavIcon>
                <Tooltip id="timesheet" />
                <FontAwesomeIcon
                  icon="clock"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('timesheet')}
              </NavText>
            </NavItem>
            <NavItem
              data-tooltip-id="notifications"
              data-tooltip-content={t('notifications')}
              eventKey={menuItems.NOTIFICATIONS}
            >
              <NavIcon>
                <Tooltip id="notifications" />
                <FontAwesomeIcon
                  icon="bell"
                  size="lg"
                />
                {
                  !expanded && !!notificationsCount && (
                    <>
                      &nbsp;
                      <NotificationsCounter
                        count={notificationsCount}
                        style={{
                          position: 'absolute',
                          left: 30,
                          lineHeight: 1,
                        }}
                      />
                    </>
                  )
                }
              </NavIcon>
              <NavText>
                {t('notifications')}
                {
                  expanded && !!notificationsCount && (
                    <>
                      &nbsp;
                      <NotificationsCounter
                        count={notificationsCount}
                      />
                    </>
                  )
                }
              </NavText>
            </NavItem>
            <NavItem
              data-tooltip-id="organizations"
              data-tooltip-content={t('organizations')}
              eventKey={menuItems.ORGANIZATIONS}
            >
              <NavIcon>
                <Tooltip id="organizations" />
                <FontAwesomeIcon
                  icon="sitemap"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('organizations')}
              </NavText>
            </NavItem>
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
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

export default Sidebar;
