import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import EntityInformationsForm from 'components/entities/EntityView/EntityInformationsForm';
import BasePage from 'components/UI/BasePage';
import { useGetEntitiesQuery } from 'services/entities/api';
import links from 'utils/links';
import './style.scss';

const EntityUpsertPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { entityId } = useParams<{ entityId: string; }>();
  const { data: entities } = useGetEntitiesQuery();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const entity = entities && entities.find(e => e.id === entityId);
  // const item = items && items.find(i => i.id === id);

  return (
    <>
      <Helmet>
        <title>{t('createAnEntity')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.entities }}>{t('entities')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} active>{t('createAnEntity')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('createAnEntity')}</h4>
        <EntityInformationsForm
          entity={entity}
        />
      </BasePage>
    </>
  );
};

export default EntityUpsertPage;
