import React from 'react';
import RBForm from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';
import { usePatchUserMeMutation } from 'services/login/api';
import { useAuth } from 'services/login/hooks';
import { setLanguage } from 'utils/translation';

const SettingsGeneral = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const { user } = auth;
  const { language } = user;

  const [patchUserMe] = usePatchUserMeMutation();

  const handleChangeLanguage = newLanguage => {
    patchUserMe({
      language: newLanguage,
    })
      .then(({ data }) => {
        if (data) {
          setLanguage(data.language);
        }
      });
  };

  return (
    <RBForm.Group>
      <RBForm.Label>{t('language')}</RBForm.Label>
      <br />
      <Select
        defaultValue={language}
        onChange={value => handleChangeLanguage(value)}
        options={[
          { label: 'English', value: 'en' },
          { label: 'Français', value: 'fr' },
        ]}
      />
    </RBForm.Group>
  );
};

export default SettingsGeneral;
