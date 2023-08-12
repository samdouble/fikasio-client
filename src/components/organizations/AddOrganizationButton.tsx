import React from 'react';
import Button from 'react-bootstrap/Button';

const AddOrganizationButton = ({
  onClick,
  style,
}) => (
  <Button
    onClick={() => onClick('NEW')}
    style={style}
    variant='primary'
  >
    Créer une organisation
  </Button>
);

export default AddOrganizationButton;
