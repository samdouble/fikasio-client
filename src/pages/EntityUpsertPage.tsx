import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import EntityInformationsForm from 'components/entities/EntityView/EntityInformationsForm';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import links from 'utils/links';
import './style.scss';

const EntityUpsertPage = ({
  fetchEntities,
  entities,
}) => {
  const { entityId } = useParams<{ entityId: string; }>();

  const getPage = () => {
    const entity = entities && entities.find(e => e.id === entityId);
    // const item = items && items.find(i => i.id === id);
    return (
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.entities }}>Entités</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} active>Créer une entité</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Créer une entité</h4>
        <EntityInformationsForm
          entity={entity}
        />
      </BasePage>
    );
  };

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

export default connect(mapStateToProps, mapDispatchToProps)(EntityUpsertPage);
