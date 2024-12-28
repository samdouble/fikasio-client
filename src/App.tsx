import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { IconPack, library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import useWebSocket from 'react-use-websocket';
import { useTranslation } from 'react-i18next';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Footer } from '@fikasio/react-ui-components';
import 'bootstrap/dist/css/bootstrap.min.css';
import { PrivateOutlet } from 'components/PrivateOutlet';
import TopMenu from 'components/TopMenu';
import { useAuth } from 'services/login/hooks';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import EntitiesPage from './pages/EntitiesPage';
import EntityPage from './pages/EntityPage';
import EntityUpsertPage from './pages/EntityUpsertPage';
import ItemUpsertPage from './pages/ItemUpsertPage';
import NotificationsPage from './pages/NotificationsPage';
import ObjectivesPage from './pages/ObjectivesPage';
import OrganizationPage from './pages/OrganizationPage';
import OrganizationsPage from './pages/OrganizationsPage';
import ProjectsPage from './pages/ProjectsPage';
import SettingsPage from './pages/SettingsPage';
import TasksPage from './pages/TasksPage';
import TimesheetPage from './pages/TimesheetPage';
import TemplateUpsertPage from './pages/TemplateUpsertPage';
import TemplatePage from './pages/TemplatePage';
import TemplatesPage from './pages/TemplatesPage';
import Page404 from './pages/Page404';
import envvars from 'utils/envvars';
import links from './utils/links';
import './App.scss';

library.add(
  fab as IconPack,
  fas as IconPack,
);

const App = () => {
  const location = useLocation();
  const auth = useAuth();
  const { t } = useTranslation();

  const { lastJsonMessage } = useWebSocket(
    (process.env.NODE_ENV === 'production') ? envvars.websocketServer : 'ws://localhost:8000',
    {
      onOpen: () => {
        console.info('WebSocket connection established.');
      },
    },
  );

  useEffect(() => {
    console.info(lastJsonMessage);
  }, [lastJsonMessage]);

  return (
    <GoogleOAuthProvider
      clientId={envvars.googleOAuthClientId}
    >
      <div className="App" id="App">
        <div className="siteContent">
          <TopMenu />
          <Routes>
            <Route element={<LoginPage />} path={links.paths.login} />
            <Route element={<SignupPage />} path={links.paths.signup} />
            <Route element={<PrivateOutlet />}>
              <Route element={<HomePage />} path="/" />
              <Route element={<HomePage />} path={links.paths.home} />
              <Route element={<DashboardPage />} path={links.paths.dashboard} />
              <Route element={<EntityUpsertPage />} path={links.paths.entityUpsert} />
              <Route element={<ItemUpsertPage />} path={links.paths.itemUpsert} />
              <Route element={<EntityPage />} path={links.paths.entity} />
              <Route element={<EntitiesPage />} path={links.paths.entities} />
              <Route element={<NotificationsPage />} path={links.paths.notifications} />
              <Route element={<ObjectivesPage />} path={links.paths.objectives} />
              <Route element={<OrganizationPage />} path={links.paths.organization} />
              <Route element={<OrganizationsPage />} path={links.paths.organizations} />
              <Route element={<ProjectsPage />} path={links.paths.projects} />
              <Route element={<SettingsPage />} path={links.paths.settings} />
              <Route element={<TasksPage />} path={links.paths.tasks} />
              <Route element={<TemplateUpsertPage />} path={links.paths.templateUpsert} />
              <Route element={<TemplatePage />} path={links.paths.template} />
              <Route element={<TemplatesPage />} path={links.paths.templates} />
              <Route element={<TimesheetPage />} path={links.timesheet()} />
              <Route element={<Page404 />} path="*" />
            </Route>
          </Routes>
          {
            (
              (location.pathname === '/' && !auth.user)
              || (location.pathname === links.paths.home && !auth.user)
              || location.pathname === links.paths.login
              || location.pathname === links.paths.signup
            ) && (
              <Footer
                childrenTop={[
                  <>
                    &copy;
                    {new Date().getFullYear()}&nbsp;
                    <a
                      href={envvars.urlWebsite}
                      key="link"
                      style={{ textDecoration: 'none' }}
                    >
                      fikas.io
                    </a>
                  </>,
                ]}
                childrenLeft={[
                  <a href={envvars.urlPrivacy} key="privacy">{t('privacy')}</a>,
                  <a href={envvars.urlToS} key="tos">{t('termsOfService')}</a>,
                ]}
                childrenRight={[
                  <a href={envvars.urlDocumentation} key="documentation">{t('documentation')}</a>,
                ]}
              />
            )
          }
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
