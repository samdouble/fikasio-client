import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetOrganizationsQuery } from 'services/organizations/api';
import { Organization } from 'services/organizations/types';
import { setPaneContent } from 'services/pane/slice';
import OrganizationsList from './OrganizationsList';
import AddOrganizationButton from './AddOrganizationButton';

const OrganizationsView = ({
  onOrganizationSelect,
}) => {
  const dispatch = useDispatch();
  const [selectedOrganizations, setSelectedOrganizations] = useState<Organization[]>([]);

  const { data: organizations } = useGetOrganizationsQuery();

  const handleOrganizationSelect = organization => {
    const isOrganizationAlreadySelected = selectedOrganizations.find(a => a.id === organization.id);
    if (isOrganizationAlreadySelected) {
      setSelectedOrganizations([
        ...selectedOrganizations.filter(a => a.id !== organization.id),
      ]);
    } else {
      setSelectedOrganizations([
        ...selectedOrganizations,
        organization,
      ]);
    }
  };

  return (
    <>
      <AddOrganizationButton
        onClick={onOrganizationSelect}
        style={{
          float: 'right',
          marginRight: 0,
        }}
      />
      <br />
      <br />
      {
        organizations ? (
          <OrganizationsList
            onOrganizationClick={
              organizationId => dispatch(
                setPaneContent({
                  type: 'ORGANIZATION',
                  id: organizationId,
                })
              )
            }
            onOrganizationSelect={handleOrganizationSelect}
            onSelectAllOrganizations={organizationsArray => setSelectedOrganizations(organizationsArray)}
            organizations={organizations}
            selectedOrganizations={selectedOrganizations}
          />
        ) : null
      }
    </>
  );
};

export default OrganizationsView;
