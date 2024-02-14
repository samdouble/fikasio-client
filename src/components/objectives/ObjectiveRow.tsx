import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime } from 'luxon';
import { Checkbox, DatePicker } from '@fikasio/react-ui-components';
import ProjectTag from 'components/projects/ProjectTag';
import Dot from 'components/UI/Dot';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { getEstimatedCompletionDate } from './utils';

const ObjectiveRow = ({
  isSelected,
  objective,
  onSelect,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);
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
        onClick={() => operations.pane.setPaneContent({
          type: 'OBJECTIVE',
          id: objective.id,
        })(dispatch)}
        style={{
          cursor: 'pointer',
        }}
      >
        <Dot
          color={color}
          width={15}
        />
        { objective.name }
      </td>
      <td width={140}>
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
          width: 150,
        }}
      >
        <DatePicker
          customInput={<input type="hidden" />}
          defaultValue={dueDate.toJSDate()}
          displayFormat="yyyy-MM-dd"
          isOpen={isDueAtDatepickerOpen}
          name="dueDate"
          onBlur={() => setIsDueAtDatepickerOpen(false)}
          onChange={value => {
            const timestamp = DateTime.fromJSDate(value)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
            operations.objectives.patchObjective(objective.id, { dueDate: timestamp.toISO() })(dispatch);
          }}
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
              onClick={() => operations.objectives.createObjective(objective)(dispatch)}
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
                operations.objectives.patchObjective(objective.id, { isArchived: !isArchived })(dispatch);
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
              onClick={() => operations.objectives.deleteObjective(objective.id)(dispatch)}
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
