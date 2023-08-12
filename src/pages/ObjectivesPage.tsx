import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import ObjectivesView from 'components/objectives/ObjectivesView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import links from 'utils/links';
import './style.scss';

const ObjectivesPage = ({
  objectives, fetchObjectives,
  metrics, fetchMetrics,
  projects, fetchProjects,
}) => {
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
      resourceFetchers={[fetchObjectives, fetchMetrics, fetchProjects]}
      getContents={getPage}
    />
  );
};

function mapStateToProps(state) {
  return {
    objectives: state.objectives,
    metrics: state.metrics,
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchObjectives: operations.objectives.fetchObjectives,
    fetchMetrics: operations.metrics.fetchMetrics,
    fetchProjects: operations.projects.fetchProjects,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectivesPage);
