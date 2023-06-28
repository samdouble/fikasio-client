import React from 'react';
import Button from 'react-bootstrap/Button';

const AddTaskButton = ({
  onClick,
  style,
}) => (
  <Button
    onClick={() => onClick('NEW')}
    style={style}
    variant='primary'
  >
    Créer une tâche
  </Button>
);

export default AddTaskButton;
