import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import useTimeout from 'use-timeout';
import { Template } from 'services/templates/types';
import TemplateRow from './TemplateRow';
import './style.scss';

const TemplatesList = ({
  templates,
}) => {
  const [delay, setDelay] = useState(null);
  const [newTemplate, setNewTemplate] = useState<Template | null>(null);
  const { t } = useTranslation();

  useTimeout(() => {
    if (newTemplate) {
      document.getElementById(newTemplate.id)?.focus();
      setDelay(null);
      setNewTemplate(null);
    }
  }, delay);

  return templates && (
    <Table
      bordered
      hover
      responsive
    >
      <thead>
        <tr>
          <th>{t('comment')}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          [...(templates || [])]
            .sort((t1, t2) => (t1.startTime < t2.startTime ? -1 : 1))
            .map(template => (
              <TemplateRow
                key={template.id}
                template={template}
              />
            ))
        }
      </tbody>
    </Table>
  );
}

export default TemplatesList;
