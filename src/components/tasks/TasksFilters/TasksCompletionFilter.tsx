import React from 'react';

interface TasksCompletionFilterProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const TasksCompletionFilter = ({
  onChange,
  style,
}: TasksCompletionFilterProps) => {
  return (
    <select
      className="form-control"
      onChange={e => onChange(e && e.target && e.target.value)}
      style={{
        ...style,
        width: 250,
      }}
    >
      <option value="INCOMPLETE">Tâches non complétées</option>
      <option value="COMPLETE">Tâches complétées</option>
      <option value="ARCHIVED">Tâches archivées</option>
      <option value="ALL">Toutes les tâches</option>
    </select>
  );
};

export default TasksCompletionFilter;
