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
    <div id="App" className="App">
      <div className="siteContent">
        <TopMenu />
        <Switch>
          <Route path={links.paths.login} component={LoginPage} />
          <Route path={links.paths.signup} component={SignupPage} />
          <Route path={links.paths.documentation} component={DocumentationPage} />
          <PrivateRoute path="/" exact component={HomePage} />
          <PrivateRoute path={links.paths.home} component={HomePage} />
          <PrivateRoute path={links.paths.dashboard} component={DashboardPage} />
          <PrivateRoute path={links.paths.entityUpsert} component={EntityUpsertPage} />
          <PrivateRoute path={links.paths.itemUpsert} component={ItemUpsertPage} />
          <PrivateRoute path={links.paths.entity} component={EntityPage} />
          <PrivateRoute path={links.paths.entities} component={EntitiesPage} />
          <PrivateRoute path={links.paths.metrics} component={MetricsPage} />
          <PrivateRoute path={links.paths.notifications} component={NotificationsPage} />
          <PrivateRoute path={links.paths.objectives} component={ObjectivesPage} />
          <PrivateRoute path={links.paths.organizations} component={OrganizationsPage} />
          <PrivateRoute path={links.paths.projects} component={ProjectsPage} />
          <PrivateRoute path={links.paths.settings} component={SettingsPage} />
          <PrivateRoute path={links.paths.tasks} component={TasksPage} />
          <PrivateRoute path={links.paths.template} component={TemplatePage} />
          <PrivateRoute path={links.paths.templates} component={TemplatesPage} />
          <PrivateRoute path={links.paths.timesheet} component={TimesheetPage} />
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
