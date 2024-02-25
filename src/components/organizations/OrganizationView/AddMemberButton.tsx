import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@fikasio/react-ui-components';

const AddMemberButton = ({
  onClick,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <Button.Action
      onClick={() => onClick('NEW')}
      style={style}
    >
      {t('addMember')}
    </Button.Action>
  );
};

export default AddMemberButton;
