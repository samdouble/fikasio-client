import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import TemplateView from 'components/templates/TemplateView';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const TemplatePage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string; }>();
  const templates = useSelector((state: RootState) => state.templates);
  const template = templates && templates.find(temp => temp.id === id);
  const dispatch = useDispatch();

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.timesheet }}>Feuille de temps</Breadcrumb.Item>
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

export default TemplatePage;