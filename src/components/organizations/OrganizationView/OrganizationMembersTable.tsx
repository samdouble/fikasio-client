import React from 'react';
import { useDispatch } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDeleteMemberFromOrganizationMutation } from 'services/organizations/api';
import { setPaneContent } from 'services/pane/slice';
import AddMemberButton from './AddMemberButton';

const OrganizationMembersTable = ({
  organization,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [deleteMember] = useDeleteMemberFromOrganizationMutation();

  return (
    <>
      <AddMemberButton
        onClick={
          () => dispatch(
            setPaneContent({
              type: 'ORGANIZATION_MEMBER',
              organizationId: organization.id,
              id: 'NEW',
            })
          )
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
            <th>{t('type')}</th>
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
                    <FontAwesomeIcon
                      icon="edit"
                      onClick={
                        () => dispatch(
                          setPaneContent({
                            type: 'ORGANIZATION_MEMBER',
                            organizationId: organization.id,
                            id: member.id,
                          }),
                        )
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
                      onClick={() => {
                        deleteMember({
                          organizationId: organization.id,
                          id: member.id,
                        });
                      }}
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
