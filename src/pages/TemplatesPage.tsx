import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import AddTemplateButton from 'components/templates/AddTemplateButton';
import TemplatesView from 'components/templates/TemplatesView';
import BasePage from 'components/UI/BasePage';
import { useGetTemplatesQuery } from 'services/templates/api';
import links from 'utils/links';
import './style.scss';

const TemplatesPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: templates } = useGetTemplatesQuery();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('templates')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.timesheet({}) }}>{t('timesheet')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{t('templates')}</Breadcrumb.Item>
        </Breadcrumb>
        <AddTemplateButton
          style={{
            float: 'right',
          }}
        />
        <h4>{t('templates')}</h4>
        <br />
        <TemplatesView
          templates={templates}
        />
      </BasePage>
    </>
  );
};

export default TemplatesPage;
