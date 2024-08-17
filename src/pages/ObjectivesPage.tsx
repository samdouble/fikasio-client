import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ObjectivesView from 'components/objectives/ObjectivesView';
import BasePage from 'components/UI/BasePage';
import { useGetObjectivesQuery } from 'services/objectives/api';
import links from 'utils/links';
import './style.scss';

const ObjectivesPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: objectives } = useGetObjectivesQuery();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('objectives')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{t('objectives')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('objectives')}</h4>
        <ObjectivesView
          objectives={objectives}
          showAddButton
          showCompletionFilter
        />
      </BasePage>
    </>
  );
};

export default ObjectivesPage;
