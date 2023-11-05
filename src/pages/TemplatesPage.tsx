import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import AddTemplateButton from 'components/templates/AddTemplateButton';
import TemplatesView from 'components/templates/TemplatesView';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const TemplatesPage = () => {
  const { t } = useTranslation();
  const templates = useSelector((state: RootState) => state.templates);
  const dispatch = useDispatch();

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.timesheet }}>Feuille de temps</Breadcrumb.Item>
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
  );

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

export default TemplatesPage;
