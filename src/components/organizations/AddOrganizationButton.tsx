import React from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

const AddOrganizationButton = ({
  onClick,
  style,
}) => {
  const { t } = useTranslation();

  return (
    <Button
      onClick={() => onClick('NEW')}
      style={style}
      variant="primary"
    >
      {t('createAnOrganization')}
    </Button>
  );
};

export default AddOrganizationButton;
