import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ObjectivesList from './ObjectivesList';
import './ObjectivesList.scss';

const ObjectivesViewer = ({
  objectives,
  onAddObjective,
  onObjectiveClick,
  onObjectiveSelect,
  onSelectAllObjectives,
  projectId,
  selectedObjectives,
  showViewModeButtons,
}) => {
  const [viewMode, setViewMode] = useState('LIST');

  let objectiveView;
  if (viewMode === 'LIST') {
    objectiveView = (
      <ObjectivesList
        onAddObjective={onAddObjective}
        onObjectiveClick={onObjectiveClick}
        onSelectAllObjectives={onSelectAllObjectives}
        onObjectiveSelect={onObjectiveSelect}
        projectId={projectId}
        selectedObjectives={selectedObjectives}
        objectives={objectives}
      />
    );
  } else {
    objectiveView = null;
  }

  return objectives && (
    <>
      {
        showViewModeButtons && (
          <div style={{ textAlign: 'left' }}>
            <Button
              active={viewMode === 'LIST'}
              onClick={() => setViewMode('LIST')}
              variant="outline-secondary"
            >
              <FontAwesomeIcon icon="list" size="1x" />
            </Button>
            <Button
              active={viewMode === 'BOARD'}
              onClick={() => setViewMode('BOARD')}
              variant="outline-secondary"
            >
              <FontAwesomeIcon icon="th" size="1x" />
            </Button>
          </div>
        )
      }
      { objectiveView }
    </>
  );
};

export default ObjectivesViewer;
