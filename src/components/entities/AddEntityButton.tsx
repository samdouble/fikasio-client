import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import links from 'utils/links';

const AddEntityButton = ({ style }) => (
  <Link
    style={{ textDecoration: 'none' }}
    to={links.paths.entityUpsert}
  >
    <Button
      style={style}
      variant="primary"
    >
      Créer une entité
    </Button>
  </Link>
);

export default AddEntityButton;
