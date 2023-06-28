import React from 'react';

const ProjectsFilter = ({ onChange, style }) => {
  return (
    <select
      className="form-control"
      onChange={e => onChange(e && e.target && e.target.value)}
      style={{
        ...style,
        width: 250,
      }}
    >
      <option value="INCOMPLETE">Projets non complétés</option>
      <option value="COMPLETE">Projets complétés</option>
      <option value="ARCHIVED">Projets archivés</option>
      <option value="ALL">Toutes les projets</option>
    </select>
  );
}

export default ProjectsFilter;
