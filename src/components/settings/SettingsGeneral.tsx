import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';
import { operations } from 'services';
import { PatchUserMeAction } from 'services/login/actions';
import { RootState } from 'services/store';
import { setLanguage } from 'utils/translation';

const SettingsGeneral = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const login = useSelector((state: RootState) => state.login);
  const { user } = login;
  const { language } = user;

  const handleChangeLanguage = newLanguage => {
    operations.login.patchUserMe({
      language: newLanguage,
    })(dispatch)
    .then(res => {
      const patchUserMeResponse = res as PatchUserMeAction;
      setLanguage(patchUserMeResponse.payload.user.language);
    });
  };

  return (
    <RBForm.Group>
      <RBForm.Label>{t('language')}</RBForm.Label>
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
