import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import EntityView from 'components/entities/EntityView';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const EntityPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string; }>();
  const entities = useSelector((state: RootState) => state.entities);
  const entity = entities && entities.find(e => e.id === id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(operations.items.fetchItems(id));
  }, [id]);

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.entities }}>{t('entities')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{ entity?.name }</Breadcrumb.Item>
      </Breadcrumb>
      <h4>{ entity?.name }</h4>
      <br />
      {
        entity && (
          <EntityView
            entity={entity}
          />
        )
      }
    </BasePage>
  );

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.entities.fetchEntities()),
      ]}
      resources={[entities]}
    />
  );
};

export default EntityPage;
