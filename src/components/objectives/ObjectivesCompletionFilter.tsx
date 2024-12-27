import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';
import FilterButton from 'components/UI/FilterButton';
import useIsMobile from 'utils/isMobile';

const ObjectivesCompletionFilter = ({ onChange, style }) => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  return (
    <div
      style={{
        ...style,
      }}
    >
      {
        isMobile && <FilterButton />
      }
      <Select
        defaultValue="INCOMPLETE"
        onChange={value => onChange(value)}
        options={[
          { label: t('ongoingObjectives'), value: 'INCOMPLETE' },
          { label: t('completeObjectives'), value: 'COMPLETE' },
          { label: t('archivedObjectives'), value: 'ARCHIVED' },
          { label: t('allObjectives'), value: 'ALL' },
        ]}
        style={{
          minWidth: 250,
        }}
      />
    </div>
  );
}

export default ObjectivesCompletionFilter;
