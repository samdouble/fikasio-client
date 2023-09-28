import React from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';
import AddMemberButton from './AddMemberButton';

const OrganizationMembersTable = ({
  organization,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <>
      <AddMemberButton
        onClick={
          () => operations.pane.setPaneContent({
            type: 'ORGANIZATION_MEMBER',
            organizationId: organization.id,
            id: 'NEW',
          })(dispatch)
        }
        style={{
          float: 'right',
          marginRight: 0,
        }}
      />
      <Table>
        <thead>
          <tr>
            <th>{t('name')}</th>
            <th>Type</th>
            <th
              style={{
                width: 60,
              }}
            >
              Requis
            </th>
            <th
              style={{
                width: 35,
              }}
            />
            <th
              style={{
                width: 35,
              }}
            />
          </tr>
        </thead>
        <tbody>
          {
            organization.members
              .map(member => (
                <tr key={member.id}>
                  <td>
                    {member.name}
                  </td>
                  <td>
                    {member.type}
                  </td>
                  <td>
                    {
                      member.isRequired && <FontAwesomeIcon
                        icon="check"
                        size="1x"
                        onClick={() => operations.organizations.members.deleteMember(organization.id, member.id)}
                        style={{
                          color: 'blue',
                          cursor: 'pointer',
                          marginLeft: 10,
                        }}
                      />
                    }
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon="edit"
                      onClick={
                        () => operations.pane.setPaneContent({
                          type: 'ORGANIZATION_MEMBER',
                          organizationId: organization.id,
                          id: member.id,
                        })(dispatch)
                      }
                      size="1x"
                      style={{
                        color: 'blue',
                        cursor: 'pointer',
                        marginLeft: 10,
                      }}
                    />
                  </td>
                  <td>
                    <FontAwesomeIcon
                      icon="times"
                      size="1x"
                      onClick={() => operations.organizations.members.deleteMember(organization.id, member.id)(dispatch)}
                      style={{
                        color: '#ce0000',
                        cursor: 'pointer',
                        marginLeft: 10,
                      }}
                    />
                  </td>
                </tr>
              ))
          }
        </tbody>
      </Table>
    </>
  );
};

export default OrganizationMembersTable;
