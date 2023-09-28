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
  PROJECTS: 'projects',
  TASKS: 'tasks',
  TIMESHEET: 'timesheet',
};

const Sidebar = () => {
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const [isExpanded, setIsExpanded] = useState(false);
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
          setIsExpanded(false);
        }}
      >
        <SideNav
          expanded={isExpanded}
          onSelect={selected => {
            const to = `/${selected}`;
            if (location.pathname !== to) {
              history.push(to);
            }
          }}
          onToggle={expanded => setIsExpanded(expanded)}
          style={{
            position: 'fixed',
            top: 60,
            backgroundColor: '#7E5B9A',
          }}
        >
          <SideNav.Toggle />
          <SideNav.Nav defaultSelected={getDefaultSelectedMenuItem() || menuItems.DASHBOARD}>
            <NavItem
              data-tooltip-content={t('dashboard')}
              data-tooltip-id="dashboard"
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
              data-tooltip-content={t('projects')}
              data-tooltip-id="projects"
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
              data-tooltip-content={t('objectives')}
              data-tooltip-id="objectives"
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
              data-tooltip-content={t('tasks')}
              data-tooltip-id="tasks"
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
              data-tooltip-content={t('entities')}
              data-tooltip-id="entities"
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
              data-tooltip-content={t('metrics')}
              data-tooltip-id="metrics"
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
              data-tooltip-content={t('timesheet')}
              data-tooltip-id="timesheet"
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
              data-tooltip-content={t('notifications')}
              data-tooltip-id="notifications"
              eventKey={menuItems.NOTIFICATIONS}
            >
              <NavIcon>
                <Tooltip id="notifications" />
                <FontAwesomeIcon
                  icon="bell"
                  size="lg"
                />
                {
                  !isExpanded && !!notificationsCount && (
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
                  isExpanded && !!notificationsCount && (
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
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
    );
  }

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.tasks.fetchTasks()),
        () => dispatch(operations.projects.fetchProjects()),
      ]}
      resources={[tasks, projects]}
    />
  );
};

export default Sidebar;
