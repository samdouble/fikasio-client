import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { useAddObjectiveMutation } from 'services/objectives/api';
import { Objective } from 'services/objectives/types';
import { setPaneContent } from 'services/pane/slice';
import ObjectivesFilters from './ObjectivesFilters/ObjectivesFilters';
import ObjectivesViewer from './ObjectivesViewer/ObjectivesViewer';
import AddObjectiveButton from './AddObjectiveButton';

interface ObjectivesViewFilter {
  archived?: boolean;
  complete?: boolean;
  dueDate?: {
    $gt?: string;
    $gte?: string;
    $lt?: string;
    $lte?: string;
  };
}
interface ObjectivesViewProps {
  onObjectiveClick: (objectiveId: string) => void;
  projectId?: string;
  showAddButton?: boolean;
  showCompletionFilter?: boolean;
  showDueDateFilter?: boolean;
  showViewModeButtons?: boolean;
  objectives?: Objective[] | null;
}

const ObjectivesView = ({
  objectives,
  onObjectiveClick,
  projectId,
  showAddButton,
  showCompletionFilter,
  showDueDateFilter,
  showViewModeButtons,
}: ObjectivesViewProps) => {
  const { t } = useTranslation();
  const [filter, setFilter] = useState<ObjectivesViewFilter>({
    complete: false,
  });
  const dispatch = useDispatch();
  const [selectedObjectives, setSelectedObjectives] = useState<Objective[]>([]);

  const [createObjective] = useAddObjectiveMutation();

  const addObjective = async objective => {
    return createObjective(objective);
  };

  const handleChangeCompletionFilter = val => {
    if (val === 'ALL') {
      setFilter({
        ...filter,
        archived: false,
        complete: undefined,
      });
    } else if (val === 'COMPLETE') {
      setFilter({
        ...filter,
        archived: false,
        complete: true,
      });
    } else if (val === 'INCOMPLETE') {
      setFilter({
        ...filter,
        archived: false,
        complete: false,
      });
    } else if (val === 'ARCHIVED') {
      setFilter({
        ...filter,
        archived: true,
        complete: undefined,
      });
    }
  };

  const handleChangeDueDateFilter = val => {
    if (val === 'ALL') {
      setFilter({
        ...filter,
        dueDate: undefined,
      });
    } else if (val === 'FOR_TODAY') {
      setFilter({
        ...filter,
        dueDate: {
          $gte: DateTime.now()
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
          $lt: DateTime.now()
            .plus({ days: 1 })
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 }),
        },
      });
    } else if (val === 'FOR_THISWEEK') {
      setFilter({
        ...filter,
        dueDate: {
          $gte: DateTime.now()
            .startOf('week')
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toJSDate(),
          $lt: DateTime.now()
            .startOf('week')
            .plus({ days: 7 })
            .set({ hour: 0, minute: 0, second: 0, millisecond: 0 })
            .toJSDate(),
        },
      });
    }
  };

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

  return (
    <>
      {
        showAddButton && (
          <AddObjectiveButton
            onClick={() => dispatch(
              setPaneContent({
                type: 'OBJECTIVE',
                id: 'NEW',
              }),
            )}
            style={{
              float: 'right',
              marginRight: 0,
            }}
          />
        )
      }
      <ObjectivesFilters
        onChangeCompletionFilter={handleChangeCompletionFilter}
        onChangeDueDateFilter={handleChangeDueDateFilter}
        showCompletionFilter={showCompletionFilter}
        showDueDateFilter={showDueDateFilter}
      />
      <ObjectivesViewer
        objectives={objectives}
        onAddObjective={objective => addObjective(objective)}
        onObjectiveClick={onObjectiveClick}
        onObjectiveSelect={handleSelectObjective}
        onSelectAllObjectives={objectivesArray => setSelectedObjectives(objectivesArray)}
        projectId={projectId}
        selectedObjectives={selectedObjectives}
        showViewModeButtons={showViewModeButtons}
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
