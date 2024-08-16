import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import ObjectivesView from 'components/objectives/ObjectivesView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const ObjectivesPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const objectives = useSelector((state: RootState) => state.objectives);
  const projects = useSelector((state: RootState) => state.projects);
  const { t } = useTranslation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  const getPage = () => (
    <>
      <Helmet>
        <title>{t('objectives')}</title>
      </Helmet>
      <BasePage>
        <Breadcrumb>
          <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
          <Breadcrumb.Item active>{t('objectives')}</Breadcrumb.Item>
        </Breadcrumb>
        <h4>{t('objectives')}</h4>
        <ObjectivesView
          objectives={objectives}
          showAddButton
          showCompletionFilter
        />
      </BasePage>
    </>
  );

  return (
    <ResourcesHandler
      resources={[objectives]}
      resourceFetchers={[
        () => dispatch(operations.objectives.fetchObjectives()),
      ]}
      getContents={getPage}
    />
  );
};

export default ObjectivesPage;
