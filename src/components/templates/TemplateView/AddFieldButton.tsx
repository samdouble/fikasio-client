import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@fikasio/react-ui-components';

const AddFieldButton = ({
  onClick,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <Button.Action
      onClick={() => onClick('NEW')}
      style={style}
    >
      {t('createAField')}
    </Button.Action>
  );
};

export default AddFieldButton;
