import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';

const OrganizationMemberRow = ({
  member,
}) => {
  const dispatch = useDispatch();

  return (
    <tr>
      <td
        style={{ cursor: 'pointer' }}
      >
        { member.name }
      </td>
      <td width={35}>
        <FontAwesomeIcon
          icon="times"
          size="1x"
          onClick={() => {
            operations.templates.deleteTemplate(member.id)(dispatch);
          }}
          style={{
            color: '#ce0000',
            cursor: 'pointer',
          }}
        />
      </td>
    </tr>
  );
}

export default OrganizationMemberRow;
