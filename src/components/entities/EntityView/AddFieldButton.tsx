import React from 'react';
import Button from 'react-bootstrap/Button';

const AddFieldButton = ({
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
    Créer un champ
  </Button>
);

export default AddFieldButton;
