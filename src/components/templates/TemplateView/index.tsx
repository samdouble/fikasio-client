import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';
import { Template } from 'services/templates/types';
import TemplateInformationsForm from './TemplateInformationsForm';
import TemplateFieldsTable from './TemplateFieldsTable';

export interface TemplateViewProps {
  defaultTab?: string,
  template: Template,
}

const TemplateView = ({
  defaultTab,
  template,
}: TemplateViewProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <Tabs
        className="mb-3"
        defaultActiveKey={defaultTab || 'INFOS'}
      >
        <Tab
          eventKey="INFOS"
          title={t('informations')}
        >
          <TemplateInformationsForm
            template={template}
          />
        </Tab>
        <Tab
          eventKey="FIELDS"
          title={t('fields')}
        >
          <TemplateFieldsTable
            template={template}
          />
        </Tab>
      </Tabs>
    </div>
  );
};

export default TemplateView;
