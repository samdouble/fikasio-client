import React from 'react';
import { useTranslation } from 'react-i18next';

const ProjectsFilter = ({ onChange, style }) => {
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
      <option value="INCOMPLETE">{t('ongoingProjects')}</option>
      <option value="COMPLETE">{t('completedProjects')}</option>
      <option value="ARCHIVED">{t('archivedProjects')}</option>
      <option value="ALL">{t('allProjects')}</option>
    </select>
  );
}

export default ProjectsFilter;
