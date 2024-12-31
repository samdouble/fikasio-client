import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { Checkbox, DatePicker, Dot } from '@fikasio/react-ui-components';
import ProjectTag from 'components/projects/ProjectTag';
import DropdownToggle from 'components/UI/DropdownToggle';
import { useAddObjectiveMutation, usePatchObjectiveMutation, useDeleteObjectiveMutation } from 'services/objectives/api';
import { Objective } from 'services/objectives/types';
// import { useGetProjectsQuery } from 'services/projects/api';
import { getEstimatedCompletionDate } from './utils';

export interface ObjectiveRowProps {
  isSelected?: boolean;
  onAddObjective: (objective: Objective) => Promise<void>;
  onClick: (objectiveId: string) => Promise<void>;
  onSelect: (objective: Objective) => Promise<void>;
  objective: any;
  projectId?: string;
}

const ObjectiveRow = ({
  isSelected,
  objective,
  onAddObjective: _onAddObjective,
  onClick,
  onSelect,
  projectId: _projectId,
}) => {
  const { t } = useTranslation();
  // const { data: projects } = useGetProjectsQuery();

  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);

  const [createObjective] = useAddObjectiveMutation();
  const [patchObjective] = usePatchObjectiveMutation();
  const [deleteObjective] = useDeleteObjectiveMutation();

  const today = DateTime.fromJSDate(new Date());
  const currentProgress = objective.progress || 0;
  const dueDate = DateTime.fromISO(objective.dueDate);
  const estimatedCompletionDate = getEstimatedCompletionDate(objective);
  const isLate = currentProgress < objective.goal && today > dueDate;
  const isEstimatedLate = !isLate && estimatedCompletionDate && (estimatedCompletionDate > dueDate);
  const color = (isLate ? '#ff0000' : (isEstimatedLate ? '#dfa901' : '#5b995b'));

  return (
    <tr className="objectiveRow">
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Checkbox
          isChecked={isSelected}
          onClick={() => onSelect(objective)}
        />
      </td>
      <td
        onClick={() => onClick && onClick(objective.id)}
        style={{
          cursor: 'pointer',
        }}
      >
        <Dot
          color={color}
          size={15}
        />
        { objective.name }
      </td>
      <td width={150}>
        {
          objective && objective.projects && objective.projects
            .map(p => (
              <ProjectTag
                key={p.id}
                projectId={p.id}
              />
            ))
        }
      </td>
      <td width={200}>
        {
          objective && objective.goal
            ? `${objective.progress || objective.initialProgress || 0} / ${objective.goal}`
            : '-'
        }
      </td>
      <td
        onClick={() => setIsDueAtDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
          ...(isLate && { color: '#ff0000' }),
          width: 120,
        }}
      >
        <DatePicker
          defaultValue={objective.dueDate ? DateTime.fromISO(objective.dueDate).toJSDate() : null}
          displayFunction={date => {
            const dateTime = DateTime.fromJSDate(date);
            return `${dateTime.monthShort} ${dateTime.day}`;
          }}
          isOpen={isDueAtDatepickerOpen}
          onChange={value => {
            const timestamp = DateTime.fromJSDate(value)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
            patchObjective({
              id: objective.id,
              dueDate: timestamp.toISO(),
            });
          }}
          onClose={() => setIsDueAtDatepickerOpen(false)}
          onRemoveValue={e => {
            e.stopPropagation();
            patchObjective({
              id: objective.id,
              dueDate: null,
            });
          }}
          shouldCloseOnSelect
          showRemoveValue
          showTimeSelect={false}
        />
      </td>
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => createObjective(objective)}
            >
              <FontAwesomeIcon
                icon="copy"
                style={{
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('duplicate')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                const isArchived = objective.isArchived || false;
                patchObjective({
                  id: objective.id,
                  isArchived: !isArchived,
                });
              }}
            >
              <FontAwesomeIcon
                icon="archive"
                style={{
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('archive')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => deleteObjective(objective.id)}
            >
              <FontAwesomeIcon
                icon="times"
                style={{
                  color: 'red',
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('delete')}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default ObjectiveRow;
