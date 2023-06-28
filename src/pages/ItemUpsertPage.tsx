import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ItemInformationsForm from 'components/entities/items/ItemInformationsForm';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const ItemUpsertPage = () => {
  const { entityId, itemId } = useParams<{ entityId: string, itemId: string }>();
  const entities = useSelector((state: RootState) => state.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.items.fetchItems(entityId));
  }, [entityId]);

  const getPage = () => {
    const entity = entities && entities.find(e => e.id === entityId);
    return entity && (
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.entities }}>Entités</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.entity(entityId) }}>
            {entity?.name}
          </Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} active>Créer un item</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Créer un item</h4>
        <ItemInformationsForm
          entityId={entityId}
          id={itemId}
        />
      </BasePage>
    );
  };

  return (
    <ResourcesHandler
      resources={[entities]}
      resourceFetchers={[
        () => dispatch(operations.entities.fetchEntities()),
      ]}
      getContents={getPage}
    />
  );
};

export default ItemUpsertPage;
