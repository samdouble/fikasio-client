import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImage from 'images/user.png';

const AssigneeButton = ({
  assigneeId,
}) => (
  <div
    style={{
      cursor: 'pointer',
    }}
  >
    {
      assigneeId
      ? (
        <img
          alt="User profile"
          src={UserImage}
          width={20}
        />
      ) : (
        <FontAwesomeIcon
          icon="user"
          size="1x"
        />
      )
    }
  </div>
);

export default AssigneeButton;
