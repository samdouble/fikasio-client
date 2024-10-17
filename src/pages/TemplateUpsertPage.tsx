import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import TemplateInformationsForm from 'components/templates/TemplateView/TemplateInformationsForm';
import BasePage from 'components/UI/BasePage';
import { useGetTemplatesQuery } from 'services/templates/api';
import links from 'utils/links';
import './style.scss';

const TemplateUpsertPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { templateId } = useParams<{ templateId: string; }>();
  const { data: templates } = useGetTemplatesQuery();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const template = templates && templates.find(temp => temp.id === templateId);

  return (
    <>
      <Helmet>
        <title>{t('createATemplate')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.timesheet }}>{t('timesheet')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} active>{t('createATemplate')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('createATemplate')}</h4>
        <TemplateInformationsForm
          template={template}
        />
      </BasePage>
    </>
  );
};

export default TemplateUpsertPage;
