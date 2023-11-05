import React from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import links from 'utils/links';

const AddTemplateButton = ({ style }) => {
  const { t } = useTranslation();

  return (
    <Link
      style={{
        textDecoration: 'none',
        ...style,
      }}
      to={links.paths.templateUpsert}
    >
      <Button
        style={{
          margin: 0,
        }}
        variant="primary"
      >
        {t('createATemplate')}
      </Button>
    </Link>
  );
};

export default AddTemplateButton;
