import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { useTranslation } from 'react-i18next';
import TemplateInformationsForm from 'components/templates/TemplateView/TemplateInformationsForm';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const TemplateUpsertPage = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();
  const { templateId } = useParams<{ templateId: string; }>();
  const templates = useSelector((state: RootState) => state.templates);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const getPage = () => {
    const template = templates && templates.find(temp => temp.id === templateId);
    return (
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
    );
  };

  return (
    <ResourcesHandler
      resources={[templates]}
      resourceFetchers={[
        () => dispatch(operations.templates.fetchTemplates()),
      ]}
      getContents={getPage}
    />
  );
};

export default TemplateUpsertPage;
