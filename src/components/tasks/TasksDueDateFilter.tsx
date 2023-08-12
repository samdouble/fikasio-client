import React from 'react';

const TasksDueDateFilter = ({ onChange, style }) => {
  return (
    <select
      className="form-control"
      onChange={e => onChange(e && e.target && e.target.value)}
      style={{
        ...style,
        width: 250,
      }}
    >
      <option value="ALL">Toutes les tâches</option>
      <option value="FOR_TODAY">Tâches pour aujourd'hui</option>
      <option value="FOR_THISWEEK">Tâches pour cette semaine</option>
    </select>
  );
}

export default TasksDueDateFilter;
