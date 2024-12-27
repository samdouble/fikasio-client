import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@fikasio/react-ui-components';
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
      <Button.Action
        style={{
          margin: 0,
        }}
      >
        {t('createATemplate')}
      </Button.Action>
    </Link>
  );
};

export default AddTemplateButton;
