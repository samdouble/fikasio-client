import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import useTimeout from 'use-timeout';
import { Template } from 'services/templates/types';
import TemplateRow from './TemplateRow';
import './style.scss';

const TemplatesList = ({
  templates,
  onTemplateSelect,
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
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th>{t('comment')}</th>
          <th />
        </tr>
      </thead>
      <tbody>
        <TemplateRow
          deletable={false}
          onSelect={onTemplateSelect}
          template={{
            id: 'DEFAULT',
            name: 'Default',
          }}
        />
        {
          templates
            .sort((p1, p2) => (p1.startTime < p2.startTime ? -1 : 1))
            .map(template => (
              <TemplateRow
                deletable
                key={template.id}
                onSelect={onTemplateSelect}
                template={template}
              />
            ))
        }
      </tbody>
    </Table>
  );
}

export default TemplatesList;
