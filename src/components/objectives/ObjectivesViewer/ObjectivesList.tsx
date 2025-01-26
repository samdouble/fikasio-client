import React from 'react';
import Table from 'react-bootstrap/Table';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '@fikasio/react-ui-components';
import ObjectiveRow from './ObjectiveRow';
import './ObjectivesList.scss';

const ObjectivesList = ({
  objectives,
  onAddObjective,
  onObjectiveClick,
  onObjectiveSelect,
  onSelectAllObjectives,
  projectId,
  selectedObjectives,
}) => {
  const { t } = useTranslation();

  const allObjectivesAreChecked = !!objectives?.length
    && (objectives?.length === selectedObjectives.length);

  const addObjective = async objective => {
    onAddObjective(objective)
      .then(async ({ data: resultObjective }) => {
        if (resultObjective) {
          await new Promise(resolve => setTimeout(resolve, 200));
          const elementsWithClassname = document.getElementsByClassName(resultObjective.id);
          const nbElementsWithClassname = elementsWithClassname.length;
          if (nbElementsWithClassname) {
            (elementsWithClassname[nbElementsWithClassname - 1] as HTMLElement).focus();
          }
        }
      });
  };

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
                  onSelectAllObjectives(objectives);
                }
              }}
            />
          </th>
          <th>{t('description')}</th>
          <th style={{ width: 150 }}>{t('projects')}</th>
          <th style={{ width: 90 }}>{t('progress')}</th>
          <th style={{ width: 120 }}>{t('deadline')}</th>
          <th style={{ width: 35 }} />
        </tr>
      </thead>
      <tbody>
        {
          objectives?.sort((o1, o2) => (
            o1.dueDate < o2.dueDate ? -1 : 1
          ))
            .map(objective => (
              <ObjectiveRow
                isSelected={!!selectedObjectives.find(o => objective.id === o.id)}
                key={objective.id}
                objective={objective}
                onAddObjective={addObjective}
                onClick={onObjectiveClick}
                onSelect={onObjectiveSelect}
                projectId={projectId}
              />
            ))
        }
      </tbody>
    </Table>
  );
};

export default ObjectivesList;
