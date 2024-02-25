import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@fikasio/react-ui-components';
import links from 'utils/links';

const AddEntityButton = ({ style }) => {
  const { t } = useTranslation();

  return (
    <Link
      style={{ textDecoration: 'none' }}
      to={links.paths.entityUpsert}
    >
      <Button.Action
        style={style}
      >
        {t('createAnEntity')}
      </Button.Action>
    </Link>
  );
};

export default AddEntityButton;
