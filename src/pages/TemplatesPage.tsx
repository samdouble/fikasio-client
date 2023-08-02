import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import TemplatesView from 'components/templates/TemplatesView';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const TemplatesPage = () => {
  const templates = useSelector((state: RootState) => state.templates);
  const dispatch = useDispatch();

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.timesheet }}>Feuille de temps</Breadcrumb.Item>
        <Breadcrumb.Item active>Modèles</Breadcrumb.Item>
      </Breadcrumb>
      <h4>Modèles</h4>
      <TemplatesView
        templates={templates}
        onTemplateSelect={
          templateId => operations.pane.setPaneContent({
            type: 'TEMPLATE',
            id: templateId,
          })(dispatch)
        }
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
