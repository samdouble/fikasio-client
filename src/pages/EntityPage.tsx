import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import EntityView from 'components/entities/EntityView';
import AddItemButton from 'components/entities/items/AddItemButton';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import links from 'utils/links';
import './style.scss';

const EntityPage = ({
  entities,
  fetchEntities,
  fetchItems,
}) => {
  const { id } = useParams<{ id: string; }>();
  const entity = entities && entities.find(entity => entity.id === id);

  useEffect(() => {
    fetchItems(id);
  }, [id]);

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.entities }}>Entités</Breadcrumb.Item>
        <Breadcrumb.Item active>{ entity.name }</Breadcrumb.Item>
      </Breadcrumb>
      <Link to={links.itemUpsert(entity.id, 'NEW')}>
        <AddItemButton
          entity={entity}
          style={{
            float: 'right',
            marginRight: 0,
          }}
        />
      </Link>
      <h4>{ entity.name }</h4>
      <br />
      <EntityView
        entity={entity}
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
    fetchItems: operations.items.fetchItems,
    setPaneContent: operations.pane.setPaneContent,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityPage);
