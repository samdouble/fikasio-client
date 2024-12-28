import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import TemplateView from 'components/templates/TemplateView';
import BasePage from 'components/UI/BasePage';
import { useGetTemplatesQuery } from 'services/templates/api';
import links from 'utils/links';
import './style.scss';

const TemplatePage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string; }>();
  const { data: templates } = useGetTemplatesQuery();
  const template = templates && templates.find(temp => temp.id === id);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('templates')} - { template?.name }</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.timesheet({}) }}>{t('timesheet')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{ template?.name }</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{ template?.name }</h4>
        <br />
        {
          template && (
            <TemplateView
              template={template}
            />
          )
        }
      </BasePage>
    </>
  );
};

export default TemplatePage;
