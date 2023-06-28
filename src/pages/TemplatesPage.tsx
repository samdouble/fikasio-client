import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import TemplatesView from 'components/templates/TemplatesView';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import links from 'utils/links';
import './style.scss';

const TemplatesPage = ({
  fetchTemplates,
  setPaneContent,
  templates,
}) => {
  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
        <Breadcrumb.Item active>Modèles</Breadcrumb.Item>
      </Breadcrumb>
      <h4>Modèles</h4>
      <TemplatesView
        templates={templates}
        onTemplateSelect={templateId => setPaneContent({
          type: 'TEMPLATE',
          id: templateId,
        })}
      />
    </BasePage>
  );

  return (
    <ResourcesHandler
      resources={[templates]}
      resourceFetchers={[fetchTemplates]}
      getContents={getPage}
    />
  );
};

function mapStateToProps(state) {
  return {
    templates: state.templates,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchTemplates: operations.templates.fetchTemplates,
    setPaneContent: operations.pane.setPaneContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesPage);
