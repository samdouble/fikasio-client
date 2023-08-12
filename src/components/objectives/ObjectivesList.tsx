import React from 'react';
import Table from 'react-bootstrap/Table';
import ObjectiveRow from './ObjectiveRow';

const ObjectivesList = ({
  objectives,
  showCompleteObjectives,
  showIncompleteObjectives,
  showArchivedObjectives,
}) => {
  return objectives && (
    <Table responsive bordered hover>
      <thead>
        <tr>
          <th>Description</th>
          <th>Projets</th>
          <th>Progression</th>
          <th>Échéance</th>
          <th />
        </tr>
      </thead>
      <tbody>
        {
          objectives
            .filter(objective => {
              return (
                (
                  (showCompleteObjectives && objective.isCompleted && !objective.isArchived)
                  || (showIncompleteObjectives && !objective.isCompleted && !objective.isArchived)
                  || (showArchivedObjectives && objective.isArchived)
                )
              );
            })
            .sort((o1, o2) => (o1.dueDate < o2.dueDate ? -1 : 1))
            .map(objective => (
              <ObjectiveRow
                key={objective.id}
                objective={objective}
              />
            ))
        }
      </tbody>
    </Table>
  );
};

export default ObjectivesList;
