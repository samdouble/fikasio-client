import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';

interface ObjectivesCompletionFilterProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const ObjectivesCompletionFilter = ({
  onChange,
  style,
}: ObjectivesCompletionFilterProps) => {
  const { t } = useTranslation();

  return (
    <Select
      defaultValue="INCOMPLETE"
      onChange={value => onChange(value)}
      options={[
        { label: t('incompleteObjectives'), value: 'INCOMPLETE' },
        { label: t('completeObjectives'), value: 'COMPLETE' },
        { label: t('archivedObjectives'), value: 'ARCHIVED' },
        { label: t('allObjectives'), value: 'ALL' },
      ]}
      style={{
        ...style,
        minWidth: 200,
      }}
    />
  );
};

export default ObjectivesCompletionFilter;
