import React from 'react';
import OrganizationsList from './OrganizationsList';
import AddOrganizationButton from './AddOrganizationButton';

const OrganizationsView = ({
  onOrganizationSelect,
}) => {
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
      <OrganizationsList
        onOrganizationSelect={onOrganizationSelect}
      />
    </>
  );
};

export default OrganizationsView;
