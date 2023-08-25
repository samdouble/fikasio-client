import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import TemplateInformationsForm from 'components/templates/TemplateView/TemplateInformationsForm';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const TemplateUpsertPage = () => {
  const { t } = useTranslation();
  const { templateId } = useParams<{ templateId: string; }>();
  const templates = useSelector((state: RootState) => state.templates);
  const dispatch = useDispatch();

  const getPage = () => {
    const template = templates && templates.find(temp => temp.id === templateId);
    return (
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.timesheet }}>Feuille de temps</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} active>Créer un modèle</Breadcrumb.Item>
        </Breadcrumb>
        <h4>Créer un modèle</h4>
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
