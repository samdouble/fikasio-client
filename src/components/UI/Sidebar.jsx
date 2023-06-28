import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { operations } from 'services';
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

const Sidebar = ({
  tasks, fetchTasks,
  projects, fetchProjects,
}) => {
  const [expanded, setExpanded] = useState(false);
  const history = useHistory();
  const location = useLocation();
  const { t } = useTranslation();

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
            <NavItem eventKey={menuItems.DASHBOARD}>
              <NavIcon>
                <FontAwesomeIcon
                  icon="chart-bar"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('dashboard')}
              </NavText>
            </NavItem>
            <NavItem eventKey={menuItems.PROJECTS}>
              <NavIcon>
                <FontAwesomeIcon
                  icon="project-diagram"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('projects')}
              </NavText>
            </NavItem>
            <NavItem eventKey={menuItems.OBJECTIVES}>
              <NavIcon>
                <FontAwesomeIcon
                  icon="bullseye"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('objectives')}
              </NavText>
            </NavItem>
            <NavItem eventKey={menuItems.TASKS}>
              <NavIcon>
                <FontAwesomeIcon
                  icon="check-square"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('tasks')}
              </NavText>
            </NavItem>
            <NavItem eventKey={menuItems.ENTITIES}>
              <NavIcon>
                <FontAwesomeIcon
                  icon="shapes"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('entities')}
              </NavText>
            </NavItem>
            <NavItem eventKey={menuItems.METRICS}>
              <NavIcon>
                <FontAwesomeIcon
                  icon="ruler"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('metrics')}
              </NavText>
            </NavItem>
            <NavItem eventKey={menuItems.TIMESHEET}>
              <NavIcon>
                <FontAwesomeIcon
                  icon="clock"
                  size="lg"
                />
              </NavIcon>
              <NavText>
                {t('timesheet')}
              </NavText>
            </NavItem>
            <NavItem eventKey={menuItems.NOTIFICATIONS}>
              <NavIcon>
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
          </SideNav.Nav>
        </SideNav>
      </ClickOutside>
    );
  }

  return (
    <ResourcesHandler
      resources={[tasks, projects]}
      resourceFetchers={[fetchTasks, fetchProjects]}
      getContents={getPage}
    />
  );
};

function mapStateToProps(state) {
  return {
    tasks: state.tasks,
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTasks: operations.tasks.fetchTasks,
    fetchProjects: operations.projects.fetchProjects,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
