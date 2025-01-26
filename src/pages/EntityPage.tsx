import React, { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import EntityView from 'components/entities/EntityView';
import BasePage from 'components/UI/BasePage';
import { useGetEntitiesQuery } from 'services/entities/api';
import links from 'utils/links';
import './style.scss';

const EntityPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { id } = useParams<{ id: string; }>();
  const { data: entities } = useGetEntitiesQuery();
  const entity = entities && entities.find(e => e.id === id);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('entities')} - { entity ? entity.name : '' }</title>
      </Helmet>
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
    </>
  );
};

export default EntityPage;
