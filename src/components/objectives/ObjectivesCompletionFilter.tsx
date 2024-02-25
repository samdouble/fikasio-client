import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';

const ObjectivesCompletionFilter = ({ onChange, style }) => {
  const { t } = useTranslation();

  return (
    <Select
      defaultValue="INCOMPLETE"
      onChange={option => onChange(option.value)}
      options={[
        { label: t('ongoingObjectives'), value: 'INCOMPLETE' },
        { label: t('completedObjectives'), value: 'COMPLETE' },
        { label: t('archivedObjectives'), value: 'ARCHIVED' },
        { label: t('allObjectives'), value: 'ALL' },
      ]}
      style={{
        ...style,
        width: 250,
      }}
    />
  );
}

export default ObjectivesCompletionFilter;
