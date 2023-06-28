import React from 'react';
import Button from 'react-bootstrap/Button';

const AddTemplateButton = ({ onClick, style }) => (
  <Button
    onClick={() => onClick('NEW')}
    style={style}
    variant='primary'
  >
    Créer un modèle
  </Button>
);

export default AddTemplateButton;
