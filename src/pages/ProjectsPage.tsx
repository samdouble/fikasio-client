import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import ProjectsView from 'components/projects/ProjectsView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const ProjectsPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const objectives = useSelector((state: RootState) => state.objectives);
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const addProject = async project => {
    return operations.projects.createProject(project)(dispatch);
  };

  const getPage = () => (
    <>
      <Helmet>
        <title>{t('projects')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{t('projects')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('projects')}</h4>
        <ProjectsView
          onAddProject={project => addProject(project)}
          onProjectClick={
            projectId => operations.pane.setPaneContent({
              type: 'PROJECT',
              id: projectId,
            })(dispatch)
          }
          projects={projects}
          showAddButton
          showCompletionFilter
          showDueDateFilter
          showViewModeButtons
        />
      </BasePage>
    </>
  );

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.projects.fetchProjects()),
        () => dispatch(operations.objectives.fetchObjectives()),
        () => dispatch(operations.tasks.fetchTasks()),
      ]}
      resources={[projects, objectives, tasks]}
    />
  );
};

export default ProjectsPage;
