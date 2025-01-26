import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { Organization } from 'services/organizations/types';
import OrganizationInformationsForm from './OrganizationInformationsForm';
import OrganizationMembersTable from './OrganizationMembersTable';

export interface OrganizationViewProps {
  defaultTab?: string,
  organization: Organization,
}

const OrganizationView = ({
  defaultTab,
  organization,
}: OrganizationViewProps) => (
  <div>
    <Tabs
      className="mb-3"
      defaultActiveKey={defaultTab || 'INFOS'}
    >
      <Tab
        eventKey="INFOS"
        title="Informations"
      >
        <OrganizationInformationsForm
          organization={organization}
        />
      </Tab>
      <Tab
        eventKey="MEMBERS"
        title="Membres"
      >
        <OrganizationMembersTable
          organization={organization}
        />
      </Tab>
    </Tabs>
  </div>
);

export default OrganizationView;
