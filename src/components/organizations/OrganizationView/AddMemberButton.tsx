import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'react-bootstrap/Button';

const AddMemberButton = ({
  onClick,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => onClick('NEW')}
      style={{
        ...style,
      }}
      variant="primary"
    >
      {t('addMember')}
    </Button>
  );
};

export default AddMemberButton;
