import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectsCompletionFilterProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const ProjectsCompletionFilter = ({
  onChange,
  style,
}: ProjectsCompletionFilterProps) => {
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
      <option value="COMPLETE">{t('completeProjects')}</option>
      <option value="ARCHIVED">{t('archivedProjects')}</option>
      <option value="ALL">{t('allProjects')}</option>
    </select>
  );
};

export default ProjectsCompletionFilter;