import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import links from 'utils/links';

const AddTemplateButton = ({ style }) => (
  <Link
    style={{ textDecoration: 'none' }}
    to={links.paths.templateUpsert}
  >
    <Button
      style={style}
      variant="primary"
    >
      Créer un modèle
    </Button>
  </Link>
);

export default AddTemplateButton;
