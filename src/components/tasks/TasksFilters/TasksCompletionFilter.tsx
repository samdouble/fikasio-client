import React from 'react';
import { useTranslation } from 'react-i18next';

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
    <select
      className="form-control"
      onChange={e => onChange(e && e.target && e.target.value)}
      style={{
        ...style,
        width: 250,
      }}
    >
      <option value="INCOMPLETE">{t('incompleteTasks')}</option>
      <option value="COMPLETE">{t('completeTasks')}</option>
      <option value="ARCHIVED">{t('archivedTasks')}</option>
      <option value="ALL">{t('allTasks')}</option>
    </select>
  );
};

export default TasksCompletionFilter;
