import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';

interface TasksDueDateFilterProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const TasksDueDateFilter = ({
  onChange,
  style,
}: TasksDueDateFilterProps) => {
  const { t } = useTranslation();

  return (
    <Select
      defaultValue="ALL"
      onChange={value => onChange(value)}
      options={[
        { label: t('allTasks'), value: 'ALL' },
        { label: t('tasksDueForToday'), value: 'FOR_TODAY' },
        { label: t('tasksDueForThisWeek'), value: 'FOR_THISWEEK' },
      ]}
      style={{
        ...style,
        minWidth: 200,
      }}
    />
  );
};

export default TasksDueDateFilter;
