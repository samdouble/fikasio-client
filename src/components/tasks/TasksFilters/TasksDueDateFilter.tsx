import React from 'react';
import { useTranslation } from 'react-i18next';

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
    <select
      className="form-control"
      onChange={e => onChange(e && e.target && e.target.value)}
      style={{
        ...style,
        width: 250,
      }}
    >
      <option value="ALL">{t('allTasks')}</option>
      <option value="FOR_TODAY">{t('tasksDueForToday')}</option>
      <option value="FOR_THISWEEK">{t('tasksDueForThisWeek')}</option>
    </select>
  );
};

export default TasksDueDateFilter;
