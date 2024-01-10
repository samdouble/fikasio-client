import React from 'react';
import { useTranslation } from 'react-i18next';

interface ProjectsDueDateFilterProps {
  onChange: (value: string) => void;
  style?: React.CSSProperties;
}

const ProjectsDueDateFilter = ({
  onChange,
  style,
}: ProjectsDueDateFilterProps) => {
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
      <option value="ALL">{t('allProjects')}</option>
      <option value="FOR_TODAY">{t('projectsDueForToday')}</option>
      <option value="FOR_THISWEEK">{t('projectsDueForThisWeek')}</option>
    </select>
  );
};

export default ProjectsDueDateFilter;
