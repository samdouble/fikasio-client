import React from 'react';
import { useSelector } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';
import { RootState } from 'services/store';
import OrganizationInformationsForm from './OrganizationInformationsForm';

const OrganizationPane = ({
  defaultTab,
  id,
}) => {
  const organizations = useSelector((state: RootState) => state.organizations);
  const { t } = useTranslation();

  const organization = (organizations || []).find(p => p.id === id);
  return (
    <>
      <h4>{ organization && organization.name }</h4>
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab || 'members'}
      >
        <Tab
          eventKey="members"
          title="Members"
        >
          <OrganizationInformationsForm
            organization={organization}
          />
        </Tab>
        <Tab
          eventKey="infos"
          title="Informations"
        >
          <OrganizationInformationsForm
            organization={organization}
          />
        </Tab>
      </Tabs>
    </>
  );
};

export default OrganizationPane;
