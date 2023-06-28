import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { operations } from 'services';
import ObjectivesList from './ObjectivesList';
import AddObjectiveButton from './AddObjectiveButton';
import ObjectivesCompletionFilter from './ObjectivesCompletionFilter';

const ObjectivesView = ({
  objectives,
  showAddButton,
  showCompletionFilter,
}) => {
  const dispatch = useDispatch();
  const [showCompleteObjectives, setShowCompleteObjectives] = useState(false);
  const [showIncompleteObjectives, setShowIncompleteObjectives] = useState(true);
  const [showArchivedObjectives, setShowArchivedObjectives] = useState(false);

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
              marginRight: 0,
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
        showCompleteObjectives={showCompleteObjectives}
        showIncompleteObjectives={showIncompleteObjectives}
        showArchivedObjectives={showArchivedObjectives}
      />
    </>
  );
};

export default ObjectivesView;
