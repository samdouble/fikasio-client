import React from 'react';
import { useSelector } from 'react-redux';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { RootState } from 'services/store';
import OrganizationInformationsForm from './OrganizationInformationsForm';
import OrganizationMembersList from './OrganizationMembersList';
import AddMemberButton from './AddMemberButton';

const OrganizationPane = ({
  defaultTab,
  id,
}) => {
  const organizations = useSelector((state: RootState) => state.organizations);

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
          <AddMemberButton
            onClick={() => undefined}
            style={{
              float: 'right',
              margin: 0,
            }}
          />
          <br />
          <br />
          <OrganizationMembersList
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
