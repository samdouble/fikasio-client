import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@fikasio/react-ui-components';

const AddActivityButton = ({ onClick, style }) => {
  const { t } = useTranslation();

  return (
    <Button.Action
      onClick={() => onClick({})}
      style={style}
    >
      {t('createAnActivity')}
    </Button.Action>
  );
};

export default AddActivityButton;
