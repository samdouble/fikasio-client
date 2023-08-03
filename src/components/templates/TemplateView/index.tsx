import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
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
}: TemplateViewProps) => (
  <div>
    <Tabs
      className="mb-3"
      defaultActiveKey={defaultTab || 'LOGS'}
    >
      <Tab
        eventKey="INFOS"
        title="Informations"
      >
        <TemplateInformationsForm
          template={template}
        />
      </Tab>
      <Tab
        eventKey="FIELDS"
        title="Champs"
      >
        <TemplateFieldsTable
          template={template}
        />
      </Tab>
    </Tabs>
  </div>
);

export default TemplateView;
