import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import OrganizationMemberRow from './OrganizationMemberRow';

const OrganizationMembersList = ({
  organization,
}) => {
  const { t } = useTranslation();

  return (
    <Table
      bordered
      hover
      responsive
    >
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          organization.members
            .sort((m1, m2) => (m1.name < m2.name ? -1 : 1))
            .map(member => (
              <OrganizationMemberRow
                key={member.id}
                member={member}
              />
            ))
        }
      </tbody>
    </Table>
  );
}

export default OrganizationMembersList;
