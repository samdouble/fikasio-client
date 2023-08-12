import React from 'react';

const ObjectivesCompletionFilter = ({ onChange, style }) => {
  return (
    <select
      className="form-control"
      onChange={e => onChange(e && e.target && e.target.value)}
      style={{
        ...style,
        width: 250,
      }}
    >
      <option value="INCOMPLETE">Objectifs non complétés</option>
      <option value="COMPLETE">Objectifs complétés</option>
      <option value="ARCHIVED">Objectifs archivés</option>
      <option value="ALL">Tous les objectifs</option>
    </select>
  );
}

export default ObjectivesCompletionFilter;
