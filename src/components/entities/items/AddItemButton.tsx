import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@fikasio/react-ui-components';
import links from 'utils/links';

const AddItemButton = ({ entity, style }) => {
  const { t } = useTranslation();

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={links.itemUpsert(entity.id, 'NEW')}
    >
      <Button.Action
        style={style}
      >
        {t('createAnItem')}
      </Button.Action>
    </Link>
  );
};

export default AddItemButton;
