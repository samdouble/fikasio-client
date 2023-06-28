import React from 'react';
import Button from 'react-bootstrap/Button';

const AddObjectiveButton = ({
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
    Créer un objectif
  </Button>
);

export default AddObjectiveButton;
