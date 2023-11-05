import React from 'react';
import { useTranslation } from 'react-i18next';

const ObjectivesCompletionFilter = ({ onChange, style }) => {
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
      <option value="INCOMPLETE">{t('ongoingObjectives')}</option>
      <option value="COMPLETE">{t('completedObjectives')}</option>
      <option value="ARCHIVED">{t('archivedObjectives')}</option>
      <option value="ALL">{t('allObjectives')}</option>
    </select>
  );
}

export default ObjectivesCompletionFilter;
