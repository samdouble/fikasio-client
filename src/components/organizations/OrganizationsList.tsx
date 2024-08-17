import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Dropdown from 'react-bootstrap/Dropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Table } from '@fikasio/react-ui-components';
import DropdownToggle from 'components/UI/DropdownToggle';
import { useGetOrganizationsQuery, useDeleteOrganizationMutation } from 'services/organizations/api';
import links from 'utils/links';

const OrganizationsList = () => {
  const { t } = useTranslation();
  const { data: organizations } = useGetOrganizationsQuery();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  return organizations ? (
    <Table
      columns={[
        {
          name: 'Name',
          property: 'name',
          render: row => (
            <Link
              style={{ textDecoration: 'none' }}
              to={links.organization(row.id)}
            >
              <div
                style={{
                  color: '#000',
                  height: '100%',
                  width: '100%',
                }}
              >
                { row.name }
              </div>
            </Link>
          ),
          type: 'cell',
          value: row => row.name,
        }, {
          type: 'options',
        }
      ]}
      options={row => (
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => deleteOrganization(row.id)}
            >
              <FontAwesomeIcon
                icon="times"
                style={{
                  color: 'red',
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('delete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )}
      rows={
        organizations
          .sort((o1, o2) => {
            const p1NameNoAccents = o1.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            const p2NameNoAccents = o2.name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
            return p1NameNoAccents < p2NameNoAccents ? -1 : 1;
          })
      }
    />
  ) : <div />;
};

export default OrganizationsList;
