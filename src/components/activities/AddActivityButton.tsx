import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const AddActivityButton = ({ onClick, style }) => {
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => onClick({})}
      style={style}
      variant="primary"
    >
      {t('createAnActivity')}
    </Button>
  );
};

export default AddActivityButton;
