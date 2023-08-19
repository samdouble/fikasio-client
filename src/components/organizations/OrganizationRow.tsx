import React from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import './style.scss';

const OrganizationRow = ({
  onClick,
  organization,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <tr
      className={classNames({ done: organization.isCompleted && !organization.isArchived })}
    >
      <td
        onClick={() => onClick(organization.id)}
        style={{ cursor: 'pointer' }}
      >
        { organization.name }
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
