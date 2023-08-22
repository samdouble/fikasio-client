import React from 'react';
import Table from 'react-bootstrap/Table';
import ObjectiveRow from './ObjectiveRow';

const ObjectivesList = ({
  objectives,
  showArchivedObjectives,
  showCompleteObjectives,
  showIncompleteObjectives,
}) => {
  return objectives && (
    <Table
      bordered
      hover
      responsive
    >
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
                  (showCompleteObjectives && objective.status === 'Completed' && !objective.isArchived)
                  || (showIncompleteObjectives && objective.status !== 'Completed' && !objective.isArchived)
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
