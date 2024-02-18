import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import classNames from 'classnames';
import { Checkbox, DatePicker } from '@fikasio/react-ui-components';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { Project } from 'services/projects/types';
import { isEmpty } from 'utils/isEmpty';
import { round } from 'utils/maths';

export interface ProjectRowProps {
  isSelected?: boolean;
  onClick: (projectId: string) => Promise<void>;
  onSelect: (project: Project) => Promise<void>;
  project: Project;
}

const ProjectRow = ({
  isSelected,
  onClick,
  onSelect,
  project,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);
  const [dueAt, setDueAt] = useState(
    project && project.dueAt
    ? DateTime.fromISO(project.dueAt).toJSDate()
    : null,
  );
  const hasdueAtPassed = project && project.dueAt && DateTime.fromISO(project.dueAt) < DateTime.now();

  return (
    <tr
      className={classNames({
        done: project.isCompleted && !project.isArchived,
      })}
    >
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Checkbox
          isChecked={isSelected}
          onClick={() => onSelect(project)}
        />
      </td>
      <td
        onClick={() => onClick(project.id)}
        style={{ cursor: 'pointer' }}
      >
        { project.name }
      </td>
      <td width={150}>
        {
          !isEmpty(project.incompleteTime)
            ? Duration.fromMillis(project.incompleteTime * 60 * 1000).toFormat('h:mm')
            : '-'
        }
      </td>
      <td width={150}>
        {
          !isEmpty(project.completionRatio)
            ? `${round(project.completionRatio * 100, 1)}%`
            : '-'
        }
      </td>
      <td
        className="projectRow_dueAt"
        onClick={() => setIsDueAtDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
          ...(!project.isCompleted && hasdueAtPassed && { color: '#ff0000' }),
          width: 150,
        }}
      >
        <DatePicker
          defaultValue={dueAt}
          displayFormat="yyyy-MM-dd"
          isOpen={isDueAtDatepickerOpen}
          name="dueAt"
          onChange={value => {
            const timestamp = DateTime
              .fromJSDate(value)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
              .toISO();
            operations.projects.patchProject(project.id, { dueAt: timestamp })(dispatch);
            setDueAt(timestamp.toJSDate());
          }}
          onClose={() => setIsDueAtDatepickerOpen(false)}
          onRemoveValue={e => {
            e.stopPropagation();
            operations.projects.patchProject(project.id, { dueAt: null })(dispatch);
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
              onClick={() => operations.projects.createProject(project)(dispatch)}
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
                const isArchived = project.isArchived || false;
                operations.projects.patchProject(project.id, { isArchived: !isArchived })(dispatch);
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
              onClick={() => operations.projects.deleteProject(project.id)(dispatch)}
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

export default ProjectRow;
