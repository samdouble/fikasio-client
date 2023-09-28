import React from 'react';
import Button from 'react-bootstrap/Button';

const AddMemberButton = ({ onClick, style }) => (
  <Button
    onClick={() => onClick({})}
    style={{
      ...style,
    }}
    variant="primary"
  >
    Inviter un membre
  </Button>
);

export default AddMemberButton;
