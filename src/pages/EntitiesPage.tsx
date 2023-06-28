import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import EntitiesView from 'components/entities/EntitiesView';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import links from 'utils/links';
import './style.scss';

const EntitiesPage = ({
  entities,
  fetchEntities,
}) => {
  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
        <Breadcrumb.Item active>Entités</Breadcrumb.Item>
      </Breadcrumb>
      <h4>Entités</h4>
      <EntitiesView
        entities={entities}
      />
    </BasePage>
  );

  return (
    <ResourcesHandler
      resources={[entities]}
      resourceFetchers={[fetchEntities]}
      getContents={getPage}
    />
  );
};

function mapStateToProps(state) {
  return {
    entities: state.entities,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchEntities: operations.entities.fetchEntities,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntitiesPage);
