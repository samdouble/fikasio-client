import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';

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
    <Select
      defaultValue="ALL"
      onChange={option => onChange(option.value)}
      options={[
        { label: t('allProjects'), value: 'ALL' },
        { label: t('projectsDueForToday'), value: 'FOR_TODAY' },
        { label: t('projectsDueForThisWeek'), value: 'FOR_THISWEEK' },
      ]}
      style={{
        ...style,
        width: 250,
      }}
    />
  );
};

export default ProjectsDueDateFilter;
