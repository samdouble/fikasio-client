import React from 'react';
import Button from 'react-bootstrap/Button';

const AddMemberButton = ({
  onClick,
  style,
}) => (
  <Button
    onClick={() => onClick('NEW')}
    style={{
      ...style,
    }}
    variant="primary"
  >
    Ajouter un membre
  </Button>
);

export default AddMemberButton;