import React from 'react';
import { useTranslation } from 'react-i18next';
import { Select } from '@fikasio/react-ui-components';

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
    <Select
      defaultValue="INCOMPLETE"
      onChange={option => onChange(option.value)}
      options={[
        { label: t('ongoingProjects'), value: 'INCOMPLETE' },
        { label: t('completeProjects'), value: 'COMPLETE' },
        { label: t('archivedProjects'), value: 'ARCHIVED' },
        { label: t('allProjects'), value: 'ALL' },
      ]}
      style={{
        ...style,
        width: 250,
      }}
    />
  );
};

export default ProjectsCompletionFilter;
