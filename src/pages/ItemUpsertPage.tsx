import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ItemInformationsForm from 'components/entities/items/ItemInformationsForm';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const ItemUpsertPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { entityId, itemId } = useParams<{ entityId: string, itemId: string }>();
  const entities = useSelector((state: RootState) => state.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  useEffect(() => {
    dispatch(operations.items.fetchItems(entityId));
  }, [entityId]);

  const getPage = () => {
    const entity = entities && entities.find(e => e.id === entityId);
    return entity && (
      <>
        <Helmet>
          <title>{t('createAnItem')}</title>
        </Helmet>
        <BasePage>
          <Breadcrumb>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.entities }}>{t('entities')}</Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.entity(entityId) }}>
              {entity?.name}
            </Breadcrumb.Item>
            <Breadcrumb.Item linkAs={Link} active>{t('createAnItem')}</Breadcrumb.Item>
          </Breadcrumb>
          <h4>{t('createAnItem')}</h4>
          <ItemInformationsForm
            entityId={entityId}
            id={itemId}
          />
        </BasePage>
      </>
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
