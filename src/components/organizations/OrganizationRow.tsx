import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import './style.scss';

const OrganizationRow = ({
  deleteOrganization,
  onClick,
  organization,
}) => {
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
      <td width={35}>
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => deleteOrganization(organization.id)}
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

function mapStateToProps(state) {
  return {
    organizations: state.organizations,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createOrganization: operations.organizations.createOrganization,
    deleteOrganization: operations.organizations.deleteOrganization,
    patchOrganization: operations.organizations.patchOrganization,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationRow);
