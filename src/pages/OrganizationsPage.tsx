import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import OrganizationsView from 'components/organizations/OrganizationsView';
import BasePage from 'components/UI/BasePage';
import { setPaneContent } from 'services/pane/slice';
import links from 'utils/links';
import './style.scss';

const OrganizationsPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('organizations')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{t('organizations')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('organizations')}</h4>
        <OrganizationsView
          onOrganizationSelect={
            organizationId => dispatch(
              setPaneContent({
                type: 'ORGANIZATION',
                id: organizationId,
              })
            )
          }
        />
      </BasePage>
    </>
  );
};

export default OrganizationsPage;
