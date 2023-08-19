import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import ObjectivesView from 'components/objectives/ObjectivesView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const ObjectivesPage = () => {
  const dispatch = useDispatch();
  const objectives = useSelector((state: RootState) => state.objectives);
  const metrics = useSelector((state: RootState) => state.metrics);
  const projects = useSelector((state: RootState) => state.projects);
  const { t } = useTranslation();

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item active>Objectifs</Breadcrumb.Item>
      </Breadcrumb>
      <h4>Objectifs</h4>
      <ObjectivesView
        objectives={objectives}
        showAddButton
        showCompletionFilter
      />
    </BasePage>
  );

  return (
    <ResourcesHandler
      resources={[objectives, metrics, projects]}
      resourceFetchers={[
        () => dispatch(operations.objectives.fetchObjectives()),
        () => dispatch(operations.metrics.fetchMetrics()),
        () => dispatch(operations.projects.fetchProjects()),
      ]}
      getContents={getPage}
    />
  );
};

export default ObjectivesPage;
