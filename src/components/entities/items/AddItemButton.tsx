import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import links from 'utils/links';

const AddItemButton = ({ entity, style }) => {
  const { t } = useTranslation();

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={links.itemUpsert(entity.id, 'NEW')}
    >
      <Button
        style={style}
        variant="primary"
      >
        {t('createAnItem')}
      </Button>
    </Link>
  );
};

export default AddItemButton;
