import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import OrganizationsView from 'components/organizations/OrganizationsView';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const OrganizationsPage = () => {
  const { t } = useTranslation();
  const organizations = useSelector((state: RootState) => state.organizations);
  const dispatch = useDispatch();

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{t('organizations')}</Breadcrumb.Item>
      </Breadcrumb>
      <h4>{t('organizations')}</h4>
      <OrganizationsView
        onOrganizationSelect={
          organizationId => operations.pane.setPaneContent({
            type: 'ORGANIZATION',
            id: organizationId,
          })(dispatch)
        }
      />
    </BasePage>
  );

  return (
    <ResourcesHandler
      resources={[organizations]}
      resourceFetchers={[
        () => dispatch(operations.organizations.fetchOrganizations()),
      ]}
      getContents={getPage}
    />
  );
};

export default OrganizationsPage;