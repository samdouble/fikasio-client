import React from 'react';
import Button from 'react-bootstrap/Button';

const AddProjectButton = ({
  onClick,
  style,
}) => (
  <Button
    onClick={() => onClick('NEW')}
    style={style}
    variant='primary'
  >
    Créer un projet
  </Button>
);

export default AddProjectButton;
