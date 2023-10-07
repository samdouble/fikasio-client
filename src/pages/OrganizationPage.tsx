import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import OrganizationView from 'components/organizations/OrganizationView';
import ResourcesHandler from 'components/ResourcesHandler';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const OrganizationPage = () => {
  const { t } = useTranslation();
  const { id } = useParams<{ id: string; }>();
  const organizations = useSelector((state: RootState) => state.organizations);
  const organization = organizations && organizations.find(temp => temp.id === id);
  const dispatch = useDispatch();

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.organizations }}>{t('organizations')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{ organization?.name }</Breadcrumb.Item>
      </Breadcrumb>
      <h4>{ organization?.name }</h4>
      <br />
      {
        organization && (
          <OrganizationView
            organization={organization}
          />
        )
      }
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

export default OrganizationPage;
