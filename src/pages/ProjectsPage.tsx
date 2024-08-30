import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ProjectsView from 'components/projects/ProjectsView';
import BasePage from 'components/UI/BasePage';
import { setPaneContent } from 'services/pane/slice';
import { useGetProjectsQuery, useAddProjectMutation } from 'services/projects/api';
import links from 'utils/links';
import './style.scss';

const ProjectsPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: projects } = useGetProjectsQuery();
  const dispatch = useDispatch();

  const [createProject] = useAddProjectMutation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const addProject = async project => {
    return createProject(project);
  };

  return (
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
            projectId => dispatch(
              setPaneContent({
                type: 'PROJECT',
                id: projectId,
              })
            )
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
};

export default ProjectsPage;
