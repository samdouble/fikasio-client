import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import links from 'utils/links';

const AddItemButton = ({ entity, style }) => (
  <Link
    style={{ textDecoration: 'none' }}
    to={links.itemUpsert(entity.id, 'NEW')}
  >
    <Button
      style={style}
      variant="primary"
    >
        Créer un item
    </Button>
  </Link>
);

export default AddItemButton;
