import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ResourcesHandler from 'components/ResourcesHandler';
import ProjectsView from 'components/projects/ProjectsView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const OrganizationsPage = () => {
  const objectives = useSelector((state: RootState) => state.objectives);
  const projects = useSelector((state: RootState) => state.projects);
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
        <Breadcrumb.Item active>Projets</Breadcrumb.Item>
      </Breadcrumb>
      <h4>Organisations</h4>
      <ProjectsView
        onProjectSelect={
          projectId => operations.pane.setPaneContent({
            type: 'PROJECT',
            id: projectId,
          })(dispatch)
        }
      />
    </BasePage>
  );

  return (
    <ResourcesHandler
      resources={[projects, objectives, tasks]}
      resourceFetchers={[
        () => dispatch(operations.projects.fetchProjects()),
        () => dispatch(operations.objectives.fetchObjectives()),
        () => dispatch(operations.tasks.fetchTasks()),
      ]}
      getContents={getPage}
    />
  );
};

export default OrganizationsPage;
