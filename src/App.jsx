import React from 'react';
import { Switch, Route, useLocation } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import TopMenu from 'components/TopMenu';
import Footer from 'components/UI/Footer';
import PrivateRoute from './PrivateRoute';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import DocumentationPage from './pages/DocumentationPage';
import EntitiesPage from './pages/EntitiesPage';
import EntityPage from './pages/EntityPage';
import EntityUpsertPage from './pages/EntityUpsertPage';
import ItemUpsertPage from './pages/ItemUpsertPage';
import MetricsPage from './pages/MetricsPage';
import NotificationsPage from './pages/NotificationsPage';
import ObjectivesPage from './pages/ObjectivesPage';
import OrganizationsPage from './pages/OrganizationsPage';
import ProjectsPage from './pages/ProjectsPage';
import SettingsPage from './pages/SettingsPage';
import TasksPage from './pages/TasksPage';
import TimesheetPage from './pages/TimesheetPage';
import TemplatePage from './pages/TemplatePage';
import TemplatesPage from './pages/TemplatesPage';
import Page404 from './pages/Page404';
import links from './utils/links';
import './App.scss';

library.add(fab, fas);

const App = () => {
  const location = useLocation();

  return (
    <div className="App" id="App">
      <div className="siteContent">
        <TopMenu />
        <Switch>
          <Route component={LoginPage} path={links.paths.login} />
          <Route component={SignupPage} path={links.paths.signup} />
          <Route component={DocumentationPage} path={links.paths.documentation} />
          <PrivateRoute
            component={HomePage}
            exact
            path="/"
          />
          <PrivateRoute component={HomePage} path={links.paths.home} />
          <PrivateRoute component={DashboardPage} path={links.paths.dashboard} />
          <PrivateRoute component={EntityUpsertPage} path={links.paths.entityUpsert} />
          <PrivateRoute component={ItemUpsertPage} path={links.paths.itemUpsert} />
          <PrivateRoute component={EntityPage} path={links.paths.entity} />
          <PrivateRoute component={EntitiesPage} path={links.paths.entities} />
          <PrivateRoute component={MetricsPage} path={links.paths.metrics} />
          <PrivateRoute component={NotificationsPage} path={links.paths.notifications} />
          <PrivateRoute component={ObjectivesPage} path={links.paths.objectives} />
          <PrivateRoute component={OrganizationsPage} path={links.paths.organizations} />
          <PrivateRoute component={ProjectsPage} path={links.paths.projects} />
          <PrivateRoute component={SettingsPage} path={links.paths.settings} />
          <PrivateRoute component={TasksPage} path={links.paths.tasks} />
          <PrivateRoute component={TemplatePage} path={links.paths.template} />
          <PrivateRoute component={TemplatesPage} path={links.paths.templates} />
          <PrivateRoute component={TimesheetPage} path={links.paths.timesheet} />
          <Route component={Page404} />
        </Switch>
        {
          (
            location.pathname === '/'
            || location.pathname === links.paths.home
            || location.pathname === links.paths.login
            || location.pathname === links.paths.signup
          ) && <Footer />
        }
      </div>
    </div>
  );
};

export default App;
