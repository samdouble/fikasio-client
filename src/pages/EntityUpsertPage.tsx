import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import EntityInformationsForm from 'components/entities/EntityView/EntityInformationsForm';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const EntityUpsertPage = () => {
  const { t } = useTranslation();
  const { entityId } = useParams<{ entityId: string; }>();
  const entities = useSelector((state: RootState) => state.entities);
  const dispatch = useDispatch();

  const getPage = () => {
    const entity = entities && entities.find(e => e.id === entityId);
    // const item = items && items.find(i => i.id === id);
    return (
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.entities }}>{t('entities')}</Breadcrumb.Item>
          <Breadcrumb.Item linkAs={Link} active>{t('createAnEntity')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('createAnEntity')}</h4>
        <EntityInformationsForm
          entity={entity}
        />
      </BasePage>
    );
  };

  return (
    <ResourcesHandler
      resources={[entities]}
      resourceFetchers={[
        () => dispatch(operations.entities.fetchEntities()),
      ]}
      getContents={getPage}
    />
  );
};

export default EntityUpsertPage;
