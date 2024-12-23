import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Sidebar as ProSidebar, Menu, MenuItem, SubMenu, sidebarClasses } from 'react-pro-sidebar';
import ClickOutside from 'react-click-outside';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';
import { Dot } from '@fikasio/react-ui-components';
import NotificationsCounter from 'components/notifications/NotificationsCounter';
import { calculateNotifications } from 'components/notifications/utils';
import UserImage from 'images/user.png';
import { useGetOrganizationsQuery } from 'services/organizations/api';
import { useGetProjectsQuery } from 'services/projects/api';
import { useGetTasksQuery } from 'services/tasks/api';
import links from 'utils/links';
import './Sidebar.scss';

const Sidebar = () => {
  const { data: organizations } = useGetOrganizationsQuery();
  const { data: projects } = useGetProjectsQuery();
  const { data: tasks } = useGetTasksQuery({});
  const [isExpanded, setIsExpanded] = useState(false);
  const { t } = useTranslation();

  const notifications = tasks && projects && calculateNotifications(tasks, projects);
  const isOverloadedInTheFuture = !!notifications?.overloadInTheFuture;
  const lateProjects = notifications?.lateProjects;
  const lateTasks = notifications?.lateTasks;
  const tasksDueAfterProjectDue = notifications?.tasksDueAfterProjectDue;
  const notificationsCount = (isOverloadedInTheFuture ? 1 : 0)
    + (lateTasks && lateTasks.length)
    + (lateProjects && lateProjects.length)
    + (tasksDueAfterProjectDue && tasksDueAfterProjectDue.length);

  return (
    <ClickOutside
      onClickOutside={() => {
        setIsExpanded(false);
      }}
    >
      {
        !isExpanded && (
          <>
            <Tooltip
              id="dashboard"
              style={{
                zIndex: 1000,
              }}
            />
            <Tooltip
              id="projects"
              style={{
                zIndex: 1000,
              }}
            />
            <Tooltip
              id="objectives"
              style={{
                zIndex: 1000,
              }}
            />
            <Tooltip
              id="tasks"
              style={{
                zIndex: 1000,
              }}
            />
            <Tooltip
              id="entities"
              style={{
                zIndex: 1000,
              }}
            />
            <Tooltip
              id="timesheet"
              style={{
                zIndex: 1000,
              }}
            />
            <Tooltip
              id="notifications"
              style={{
                zIndex: 1000,
              }}
            />
          </>
        )
      }
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
          [`.${sidebarClasses.container}`]: {
            overflowY: 'hidden',
          },
        }}
      >
        <Menu
          menuItemStyles={{
            root: {
              backgroundColor: '#7E5B9A',
            },
          }}
          renderExpandIcon={() => undefined}
        >
          <MenuItem
            component={(
              <div
                onClick={() => setIsExpanded(!isExpanded)}
              />
            )}
          >
            <FontAwesomeIcon
              icon={isExpanded ? 'times' : 'bars'}
              size="lg"
            />
          </MenuItem>
          <SubMenu
            label={
              <>
                <img
                  alt="User profile"
                  src={UserImage}
                  style={{
                    marginRight: 10,
                  }}
                  width={20}
                />
                <b>{t('myOrganization')}</b>
              </>
            }
          >
            {
              organizations?.map(organization => (
                <MenuItem
                  key={organization.id}
                  rootStyles={{
                    backgroundColor: '#977BAE',
                  }}
                > 
                  {organization.name}
                </MenuItem>
              ))
            }
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
                to={links.timesheet()}
              />
            )}
            data-tooltip-content={t('timesheet')}
            data-tooltip-id="timesheet"
          >
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
                  <Dot
                    color="#ce0000"
                    size={10}
                    style={{
                      left: 30,
                      position: 'absolute',
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
};

export default Sidebar;
