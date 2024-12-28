import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import usePrevious from 'use-previous';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'lodash.isequal';
import { AutosaveTextarea, Checkbox, Selector } from '@fikasio/react-ui-components';
import ProjectTag from 'components/projects/ProjectTag';
import DropdownToggle from 'components/UI/DropdownToggle';
import { useAddOrganizationMutation, usePatchOrganizationMutation, useDeleteOrganizationMutation } from 'services/organizations/api';
import { Organization } from 'services/organizations/types';

export interface OrganizationRowProps {
  isSelected?: boolean;
  onClick: (organizationId: string) => Promise<void>;
  onSelect: (organization: Organization) => Promise<void>;
  organization: any;
}

const OrganizationRow = ({
  isSelected,
  onClick,
  onSelect,
  organization: pOrganization,
}: OrganizationRowProps) => {
  const { t } = useTranslation();

  const prevPOrganization = usePrevious(pOrganization);
  const [organization, setOrganization] = useState(pOrganization);
  const [description, setIDescription] = useState((organization && organization.description) || '');
  const [hasFocus, setHasFocus] = useState(false);

  const [createOrganization] = useAddOrganizationMutation();
  const [patchOrganization] = usePatchOrganizationMutation();
  const [deleteOrganization] = useDeleteOrganizationMutation();

  useEffect(() => {
    if (!isEqual(pOrganization, prevPOrganization)) {
      setOrganization({
        ...organization,
        ...pOrganization,
      });
    }
  }, [pOrganization]);

  useEffect(() => {
    if (!hasFocus) {
      setIDescription(organization.description);
    }
  }, [organization]);

  const handleBlur = () => {
    setHasFocus(false);
  };

  const handleFocus = () => {
    setHasFocus(true);
  };

  return (
    <tr
      className={classNames({
        organizationRow: true,
        done: organization && organization.status === 'Completed',
      })}
    >
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Checkbox
          isChecked={isSelected}
          onClick={() => onSelect(organization)}
        />
      </td>
      <td
        className="organizationRow_description"
        onClick={() => onClick && onClick(organization.id)}
        style={{
          cursor: 'pointer',
        }}
      >
        <AutosaveTextarea
          className={classNames({
            organizationRow_description_editable: true,
            [organization.id]: true,
          })}
          defaultValue={description}
          onBlur={() => handleBlur()}
          onFocus={() => handleFocus()}
          onSave={async value => {
            if (organization.id) {
              patchOrganization({
                id: organization.id,
                ...organization,
                description: value,
              });
            } else {
              createOrganization({
                ...organization,
                description: value,
              })
                .then(resultOrganization => setOrganization(resultOrganization));
            }
          }}
          style={{
            float: 'left',
            height: 25,
            overflowY: 'hidden',
            paddingLeft: 5,
            paddingRight: 50,
            paddingTop: 0,
            width: 'auto',
          }}
          useContentEditableDiv
        />
      </td>
      <td width={150}>
        {
          organization && organization.projects && organization.projects
            .map(p => (
              <ProjectTag
                key={p.id}
                projectId={p.id}
              />
            ))
        }
        <Selector
          options={[]}
          value={organization.members}
        />
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

export default OrganizationRow;
