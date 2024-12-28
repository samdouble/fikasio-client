import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import EntitiesView from 'components/entities/EntitiesView';
import BasePage from 'components/UI/BasePage';
import { useGetEntitiesQuery } from 'services/entities/api';
import links from 'utils/links';
import './style.scss';

const EntitiesPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: entities } = useGetEntitiesQuery();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('entities')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{t('entities')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('entities')}</h4>
        <EntitiesView
          entities={entities}
        />
      </BasePage>
    </>
  );
};

export default EntitiesPage;
