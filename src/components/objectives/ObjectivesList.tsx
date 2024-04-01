import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@fikasio/react-ui-components';
import ObjectiveRow from './ObjectiveRow';
import './ObjectivesList.scss';

const ObjectivesList = ({
  objectives,
  onObjectiveSelect,
  onSelectAllObjectives,
  selectedObjectives,
  showArchivedObjectives,
  showCompleteObjectives,
  showIncompleteObjectives,
}) => {
  const { t } = useTranslation();

  const objectivesToShow = objectives?.filter(o => {
    return (
      (
        (showCompleteObjectives && o.status === 'Completed' && !o.isArchived)
        || (showIncompleteObjectives && o.status !== 'Completed' && !o.isArchived)
        || (showArchivedObjectives && o.isArchived)
      )
    );
  });
  const allObjectivesAreChecked = objectivesToShow?.length
    && (objectivesToShow?.length === selectedObjectives.length);

  return (
    <Table
      bordered
      hover
      responsive
    >
      <thead>
        <tr>
          <th style={{ width: 35 }}>
            <Checkbox
              isChecked={allObjectivesAreChecked}
              onClick={() => {
                if (allObjectivesAreChecked) {
                  onSelectAllObjectives([]);
                } else {
                  onSelectAllObjectives(objectivesToShow);
                }
              }}
            />
          </th>
          <th>{t('description')}</th>
          <th style={{ width: 150 }}>{t('projects')}</th>
          <th style={{ width: 90 }}>{t('progress')}</th>
          <th style={{ width: 150 }}>{t('deadline')}</th>
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          objectivesToShow?.sort((o1, o2) => (
            o1.dueDate < o2.dueDate ? -1 : 1
          ))
            .map(objective => (
              <ObjectiveRow
                isSelected={!!selectedObjectives.find(o => objective.id === o.id)}
                key={objective.id}
                objective={objective}
                onSelect={onObjectiveSelect}
              />
            ))
        }
      </tbody>
    </Table>
  );
};

export default ObjectivesList;
