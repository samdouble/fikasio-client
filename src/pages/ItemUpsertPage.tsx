import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ItemInformationsForm from 'components/entities/items/ItemInformationsForm';
import BasePage from 'components/UI/BasePage';
import { useGetEntitiesQuery } from 'services/entities/api';
import links from 'utils/links';
import './style.scss';

const ItemUpsertPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { entityId, itemId } = useParams<{ entityId: string, itemId: string }>();
  const { data: entities } = useGetEntitiesQuery();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const entity = entities && entities.find(e => e.id === entityId);

  return (entity && itemId) ? (
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
          entityId={entity.id}
          id={itemId}
        />
      </BasePage>
    </>
  ) : null;
};

export default ItemUpsertPage;
