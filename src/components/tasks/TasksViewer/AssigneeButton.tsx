import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import UserImage from 'images/user.png';

interface AssigneeButtonProps {
  assigneeId: string;
  style?: React.CSSProperties;
}

const AssigneeButton = ({
  assigneeId,
  style,
}: AssigneeButtonProps) => {
  return (
    <div
      style={{
        border: '1px solid #cecece',
        borderRadius: '50%',
        cursor: 'pointer',
        height: 25,
        padding: 5,
        width: 25,
        ...style,
      }}
    >
      {
        assigneeId
        ? (
          <img
            alt="User profile"
            src={UserImage}
            width={14}
          />
        ) : (
          <FontAwesomeIcon
            icon="user"
            size="1x"
            style={{
              color: '#cecece',
              fontSize: 14,
            }}
          />
        )
      }
    </div>
  );
};

export default AssigneeButton;
