import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';

interface ObjectivesDueDateFilterProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const ObjectivesDueDateFilter = ({
  onChange,
  style,
}: ObjectivesDueDateFilterProps) => {
  const { t } = useTranslation();

  return (
    <Select
      defaultValue="ALL"
      onChange={value => onChange(value)}
      options={[
        { label: t('allObjectives'), value: 'ALL' },
        { label: t('objectivesDueForToday'), value: 'FOR_TODAY' },
        { label: t('objectivesDueForThisWeek'), value: 'FOR_THISWEEK' },
      ]}
      style={{
        ...style,
        minWidth: 200,
      }}
    />
  );
};

export default ObjectivesDueDateFilter;
