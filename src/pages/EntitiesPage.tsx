import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { useTranslation } from 'react-i18next';
import EntitiesView from 'components/entities/EntitiesView';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const EntitiesPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const entities = useSelector((state: RootState) => state.entities);
  const dispatch = useDispatch();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{t('entities')}</Breadcrumb.Item>
      </Breadcrumb>
      <h4>{t('entities')}</h4>
      <EntitiesView
        entities={entities}
      />
    </BasePage>
  );

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

export default EntitiesPage;
