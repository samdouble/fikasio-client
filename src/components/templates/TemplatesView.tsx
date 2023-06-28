import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TemplatesList from './TemplatesList';
import AddTemplateButton from './AddTemplateButton';

const TemplatesView = ({
  templates,
  onTemplateSelect,
}) => {
  const [viewMode, setViewMode] = useState('LIST');

  let templateView;
  if (viewMode === 'LIST') {
    templateView = <TemplatesList
      templates={templates}
      onTemplateSelect={onTemplateSelect}
    />
  } else {
    templateView = null;
  }

  return (
    <>
      <div style={{ textAlign: 'left' }}>
        <AddTemplateButton
          onClick={onTemplateSelect}
          style={{
            float: 'right',
            marginRight: 0,
          }}
        />
        <Button
          variant="outline-secondary"
          active={viewMode === 'LIST'}
          onClick={() => setViewMode('LIST')}
        >
          <FontAwesomeIcon icon="list" size="1x" />
        </Button>
        <Button
          onClick={() => setViewMode('BOARD')}
          active={viewMode === 'BOARD'}
          variant="outline-secondary"
        >
          <FontAwesomeIcon icon="th" size="1x" />
        </Button>
      </div>
      { templateView }
    </>
  );
}

export default TemplatesView;
