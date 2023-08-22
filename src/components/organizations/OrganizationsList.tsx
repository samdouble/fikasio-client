import React from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { RootState } from 'services/store';
import OrganizationRow from './OrganizationRow';

const OrganizationsList = ({
  onOrganizationSelect,
}) => {
  const { t } = useTranslation();
  const organizations = useSelector((state: RootState) => state.organizations);

  return organizations ? (
    <Table
      responsive
      bordered
      hover
    >
      <thead>
        <tr>
          <th>{t('name')}</th>
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          organizations
            .sort((o1, o2) => {
              const p1NameNoAccents = o1.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
              const p2NameNoAccents = o2.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
              return p1NameNoAccents < p2NameNoAccents ? -1 : 1;
            })
            .map(organization => (
              <OrganizationRow
                key={organization.id}
                onClick={onOrganizationSelect}
                organization={organization}
              />
            ))
        }
      </tbody>
    </Table>
  ) : <div />;
};

export default OrganizationsList;
