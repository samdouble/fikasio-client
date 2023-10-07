import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import UserImage from 'images/user.png';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import NotificationsCounter from '../notifications/NotificationsCounter';
import ResourcesHandler from '../ResourcesHandler';
import { calculateNotifications } from '../notifications/utils';
import './Sidebar.scss';

const Sidebar = () => {
  const organizations = useSelector((state: RootState) => state.organizations);
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const notifications = tasks && projects && calculateNotifications(tasks, projects);
  const lateTasks = notifications && notifications.lateTasks;
  const tasksDueAfterProjectDue = notifications && notifications.tasksDueAfterProjectDue;
  const notificationsCount = (lateTasks && lateTasks.length)
    + (tasksDueAfterProjectDue && tasksDueAfterProjectDue.length);

  const getPage = () => {
    return (
      <ClickOutside
        onClickOutside={() => {
          setIsExpanded(false);
        }}
      >
        <ProSidebar
          backgroundColor="#7E5B9A"
          collapsed={!isExpanded}
          collapsedWidth="60px"
          rootStyles={{
            color: 'white',
            height: '100%',
            position: 'fixed',
            top: 60,
            zIndex: 100,
          }}
        >
          <Menu
            renderExpandIcon={() => undefined}
          >
            <MenuItem>
              <FontAwesomeIcon
                icon={isExpanded ? 'times' : 'bars'}
                onClick={() => setIsExpanded(!isExpanded)}
                size="lg"
              />
            </MenuItem>
            <SubMenu
              label={
                <img
                  alt="User profile"
                  src={UserImage}
                  width={20}
                />
              }
            >
              <MenuItem> 
                Pie charts
              </MenuItem>
              <MenuItem>
                Line charts
              </MenuItem>
            </SubMenu>
            <MenuItem
              component={(
                <Link
                  to={links.paths.dashboard}
                />
              )}
              data-tooltip-content={t('dashboard')}
              data-tooltip-id="dashboard"
            >
              <Tooltip id="dashboard" />
              <FontAwesomeIcon
                icon="chart-bar"
                size="sm"
                style={{
                  marginRight: 15,
                }}
              />
              {t('dashboard')}
            </MenuItem>
            <MenuItem
              component={(
                <Link
                  to={links.paths.projects}
                />
              )}
              data-tooltip-content={t('projects')}
              data-tooltip-id="projects"
            >
              <Tooltip id="projects" />
              <FontAwesomeIcon
                icon="project-diagram"
                size="sm"
                style={{
                  marginRight: 15,
                }}
              />
              {t('projects')}
            </MenuItem>
            <MenuItem
              component={(
                <Link
                  to={links.paths.objectives}
                />
              )}
              data-tooltip-content={t('objectives')}
              data-tooltip-id="objectives"
            >
              <Tooltip id="objectives" />
              <FontAwesomeIcon
                icon="bullseye"
                size="sm"
                style={{
                  marginRight: 15,
                }}
              />
              {t('objectives')}
            </MenuItem>
            <MenuItem
              component={(
                <Link
                  to={links.paths.tasks}
                />
              )}
              data-tooltip-content={t('tasks')}
              data-tooltip-id="tasks"
            >
              <Tooltip id="tasks" />
              <FontAwesomeIcon
                icon="check-square"
                size="sm"
                style={{
                  marginRight: 15,
                }}
              />
              {t('tasks')}
            </MenuItem>
            <MenuItem
              component={(
                <Link
                  to={links.paths.entities}
                />
              )}
              data-tooltip-content={t('entities')}
              data-tooltip-id="entities"
            >
              <Tooltip id="entities" />
              <FontAwesomeIcon
                icon="shapes"
                size="sm"
                style={{
                  marginRight: 15,
                }}
              />
              {t('entities')}
            </MenuItem>
            <MenuItem
              component={(
                <Link
                  to={links.paths.metrics}
                />
              )}
              data-tooltip-content={t('metrics')}
              data-tooltip-id="metrics"
            >
              <Tooltip id="metrics" />
              <FontAwesomeIcon
                icon="ruler"
                size="sm"
                style={{
                  marginRight: 15,
                }}
              />
              {t('metrics')}
            </MenuItem>
            <MenuItem
              component={(
                <Link
                  to={links.paths.timesheet}
                />
              )}
              data-tooltip-content={t('timesheet')}
              data-tooltip-id="timesheet"
            >
              <Tooltip id="timesheet" />
              <FontAwesomeIcon
                icon="clock"
                size="sm"
                style={{
                  marginRight: 15,
                }}
              />
              {t('timesheet')}
            </MenuItem>
            <MenuItem
              component={(
                <Link
                  to={links.paths.notifications}
                />
              )}
              data-tooltip-content={t('notifications')}
              data-tooltip-id="notifications"
            >
              <Tooltip id="notifications" />
              <FontAwesomeIcon
                icon="bell"
                size="sm"
                style={{
                  marginRight: 15,
                }}
              />
              {t('notifications')}
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
            </MenuItem>
          </Menu>
        </ProSidebar>
      </ClickOutside>
    );
  }

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.organizations.fetchOrganizations()),
        () => dispatch(operations.tasks.fetchTasks()),
        () => dispatch(operations.projects.fetchProjects()),
      ]}
      resources={[organizations, tasks, projects]}
    />
  );
};

export default Sidebar;
