import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import links from 'utils/links';
import './style.scss';

const OrganizationRow = ({
  organization,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <tr>
      <td
        style={{ cursor: 'pointer' }}
      >
        <Link
          style={{ textDecoration: 'none' }}
          to={links.organization(organization.id)}
        >
          <div
            style={{
              color: '#000',
              height: '100%',
              width: '100%',
            }}
          >
            { organization.name }
          </div>
        </Link>
      </td>
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => operations.organizations.deleteOrganization(organization.id)(dispatch)}
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
      </td>
    </tr>
  );
};

export default OrganizationRow;
