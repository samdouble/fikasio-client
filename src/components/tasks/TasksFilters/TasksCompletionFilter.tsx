import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';

interface TasksCompletionFilterProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const TasksCompletionFilter = ({
  onChange,
  style,
}: TasksCompletionFilterProps) => {
  const { t } = useTranslation();

  return (
    <Select
      defaultValue="INCOMPLETE"
      onChange={value => onChange(value)}
      options={[
        { label: t('incompleteTasks'), value: 'INCOMPLETE' },
        { label: t('completeTasks'), value: 'COMPLETE' },
        { label: t('archivedTasks'), value: 'ARCHIVED' },
        { label: t('allTasks'), value: 'ALL' },
      ]}
      style={{
        ...style,
        minWidth: 200,
      }}
    />
  );
};

export default TasksCompletionFilter;
