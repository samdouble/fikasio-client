import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';
import { Objective } from 'services/objectives/types';
import ObjectivesList from './ObjectivesList';
import AddObjectiveButton from './AddObjectiveButton';
import ObjectivesCompletionFilter from './ObjectivesCompletionFilter';

const ObjectivesView = ({
  objectives,
  showAddButton,
  showCompletionFilter,
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [selectedObjectives, setSelectedObjectives] = useState<Objective[]>([]);
  const [showCompleteObjectives, setShowCompleteObjectives] = useState(false);
  const [showIncompleteObjectives, setShowIncompleteObjectives] = useState(true);
  const [showArchivedObjectives, setShowArchivedObjectives] = useState(false);

  const handleSelectObjective = objective => {
    const isObjectiveAlreadySelected = selectedObjectives.find(a => a.id === objective.id);
    if (isObjectiveAlreadySelected) {
      setSelectedObjectives([
        ...selectedObjectives.filter(a => a.id !== objective.id),
      ]);
    } else {
      setSelectedObjectives([
        ...selectedObjectives,
        objective,
      ]);
    }
  };

  const handleChangeCompletionFilter = val => {
    if (val === 'ALL') {
      setShowCompleteObjectives(true);
      setShowIncompleteObjectives(true);
      setShowArchivedObjectives(true);
    } else if (val === 'COMPLETE') {
      setShowCompleteObjectives(true);
      setShowIncompleteObjectives(false);
      setShowArchivedObjectives(false);
    } else if (val === 'INCOMPLETE') {
      setShowCompleteObjectives(false);
      setShowIncompleteObjectives(true);
      setShowArchivedObjectives(false);
    } else if (val === 'ARCHIVED') {
      setShowCompleteObjectives(false);
      setShowIncompleteObjectives(false);
      setShowArchivedObjectives(true);
    }
  };

  return (
    <>
      {
        showAddButton && (
          <AddObjectiveButton
            onClick={() => operations.pane.setPaneContent({
              type: 'OBJECTIVE',
              id: 'NEW',
            })(dispatch)}
            style={{
              float: 'right',
              ...(showAddButton && { marginRight: 0 }),
            }}
          />
        )
      }
      {
        showCompletionFilter && (
          <ObjectivesCompletionFilter
            onChange={handleChangeCompletionFilter}
            style={{
              float: 'right',
              ...(showAddButton && { margin: 5 }),
            }}
          />
        )
      }
      <br />
      <br />
      <ObjectivesList
        objectives={objectives}
        onObjectiveSelect={handleSelectObjective}
        onSelectAllObjectives={objectivesArray => setSelectedObjectives(objectivesArray)}
        selectedObjectives={selectedObjectives}
        showCompleteObjectives={showCompleteObjectives}
        showIncompleteObjectives={showIncompleteObjectives}
        showArchivedObjectives={showArchivedObjectives}
      />
      {
        selectedObjectives.length > 0 && (
          <div
            style={{
              backgroundColor: '#7E5B9A',
              bottom: 50,
              color: 'white',
              height: 100,
              left: '22%',
              margin: 'auto',
              padding: 10,
              position: 'fixed',
              width: '60%',
            }}
          >
            <FontAwesomeIcon
              icon="times"
              onClick={() => {
                setSelectedObjectives([]);
              }}
              style={{
                cursor: 'pointer',
                marginRight: 10,
                width: 25,
              }}
            />
            <b>
              {t('xSelectedObjectives', { count: selectedObjectives.length })}
            </b>
          </div>
        )
      }
    </>
  );
};

export default ObjectivesView;
