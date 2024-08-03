import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import classNames from 'classnames';
import { AutosaveTextarea, Checkbox, DatePicker } from '@fikasio/react-ui-components';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { Project } from 'services/projects/types';
import { isEmpty } from 'utils/isEmpty';
import { round } from 'utils/maths';

export interface ProjectRowProps {
  isSelected?: boolean;
  onAddProject: (project: Project) => Promise<void>;
  onClick: (projectId: string) => Promise<void>;
  onSelect: (project: Project) => Promise<void>;
  project: Project;
}

const ProjectRow = ({
  isSelected,
  onAddProject,
  onClick,
  onSelect,
  project: pProject,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [project, setProject] = useState(pProject);
  const [name, setName] = useState((project && project.name) || '');
  const [hasFocus, setHasFocus] = useState(false);
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);

  useEffect(() => {
    if (!hasFocus) {
      setName(project.name);
    }
  }, [project]);

  const handleBlur = () => {
    setHasFocus(false);
  };

  const handleFocus = () => {
    setHasFocus(true);
  };

  const handleKeyDownName = e => {
    if (e.key === 'Enter') {
      onAddProject({
        name: '',
      });
      e.preventDefault();
    }
  };

  const handleKeyUpName = (e, updatedProject) => {
    if (updatedProject) {
      if (e.key === 'Backspace' && e.target.textContent === '') {
        operations.projects.deleteProject(updatedProject.id)(dispatch);
      }
    } else if (e.target.textContent !== '') {
      operations.projects.createProject({
        name: e.target.textContent,
      })(dispatch);
    }
  };

  const hasdueAtPassed = project && project.dueAt && DateTime.fromISO(project.dueAt) < DateTime.now();

  return (
    <tr
      className={classNames({
        projectRow: true,
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
        className="projectRow_name"
        onClick={() => onClick(project.id)}
        style={{ cursor: 'pointer' }}
      >
        <AutosaveTextarea
          className={classNames({
            projectRow_name_editable: true,
            [project.id]: true,
          })}
          defaultValue={name}
          onBlur={() => handleBlur()}
          onFocus={() => handleFocus()}
          onKeyDown={e => handleKeyDownName(e)}
          onKeyUp={e => handleKeyUpName(e, project)}
          onSave={async value => {
            if (project.id) {
              operations.projects.patchProject(project.id, {
                ...project,
                name: value,
              })(dispatch);
            } else {
              operations.tasks.createTask({
                ...project,
                name: value,
              })(dispatch)
                .then(resultProject => setProject(resultProject));
            }
          }}
          style={{
            float: 'left',
            height: 25,
            overflowY: 'hidden',
            paddingLeft: 5,
            paddingRight: 50,
            paddingTop: 0,
            width: 'auto',
          }}
          useContentEditableDiv
        />
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
          minWidth: 150,
        }}
      >
        <DatePicker
          defaultValue={project.dueAt ? DateTime.fromISO(project.dueAt).toJSDate() : null}
          displayFormat="yyyy-MM-dd"
          isOpen={isDueAtDatepickerOpen}
          onChange={value => {
            const timestamp = DateTime
              .fromJSDate(value)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
              .toISO();
            operations.projects.patchProject(project.id, { dueAt: timestamp })(dispatch);
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
