import React from 'react';
import Button from 'react-bootstrap/Button';

const AddActivityButton = ({ onClick, style }) => (
  <Button
    onClick={() => onClick({})}
    style={style}
    variant="primary"
  >
    Créer une activité
  </Button>
);

export default AddActivityButton;
