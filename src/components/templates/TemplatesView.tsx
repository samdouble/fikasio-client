import React from 'react';
import TemplatesList from './TemplatesList';
import AddTemplateButton from './AddTemplateButton';

const TemplatesView = ({
  templates,
}) => (
  <>
    <div style={{ textAlign: 'left' }}>
      <AddTemplateButton
        style={{
          float: 'right',
          marginRight: 0,
        }}
      />
    </div>
    <TemplatesList
      templates={templates}
    />
  </>
);

export default TemplatesView;
