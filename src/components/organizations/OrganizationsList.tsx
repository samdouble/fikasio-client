import React from 'react';
import { useTranslation } from 'react-i18next';
import Table from 'react-bootstrap/Table';
import { Checkbox } from '@fikasio/react-ui-components';
import OrganizationRow from './OrganizationRow';
const OrganizationsList = ({
  onOrganizationClick,
  onOrganizationSelect,
  onSelectAllOrganizations,
  organizations,
  selectedOrganizations,
}) => {
  const { t } = useTranslation();

  const allOrganizationsAreChecked = !!organizations?.length
    && (organizations?.length === selectedOrganizations.length);

  return (
    <Table
      bordered
      hover
      responsive
      style={{
        overflowX: 'scroll',
      }}
    >
      <thead>
        <tr>
          <th
            style={{ width: 35 }}
          >
            <Checkbox
              isChecked={allOrganizationsAreChecked}
              onClick={() => {
                if (allOrganizationsAreChecked) {
                  onSelectAllOrganizations([]);
                } else {
                  onSelectAllOrganizations(organizations);
                }
              }}
            />
          </th>
          <th style={{ minWidth: 500 }}>{t('name')}</th>
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
                isSelected={!!selectedOrganizations.find(o1 => organization.id === o1.id)}
                key={`${organization.id}-${organization.dueAt}`}
                onClick={onOrganizationClick}
                onSelect={onOrganizationSelect}
                organization={organization}
              />
            ))
        }
      </tbody>
    </Table>
  );
};

export default OrganizationsList;
