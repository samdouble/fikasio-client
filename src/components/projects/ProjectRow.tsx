import React, { useEffect, useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import classNames from 'classnames';
import { AutosaveTextarea, Checkbox, DatePicker } from '@fikasio/react-ui-components';
import DropdownToggle from 'components/UI/DropdownToggle';
import { useAddProjectMutation, usePatchProjectMutation, useDeleteProjectMutation } from 'services/projects/api';
import { Project } from 'services/projects/types';
import { useAddTaskMutation } from 'services/tasks/api';
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
  const { t } = useTranslation();

  const [project, setProject] = useState(pProject);
  const [name, setName] = useState((project && project.name) || '');
  const [hasFocus, setHasFocus] = useState(false);
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);

  const [createProject] = useAddProjectMutation();
  const [patchProject] = usePatchProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [createTask] = useAddTaskMutation();

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
        deleteProject(updatedProject.id);
      }
    } else if (e.target.textContent !== '') {
      createProject({
        name: e.target.textContent,
      });
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
              patchProject({
                id: project.id,
                ...project,
                name: value,
              });
            } else {
              createTask({
                ...project,
                name: value,
              })
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
          minWidth: 120,
        }}
      >
        <DatePicker
          defaultValue={project.dueAt ? DateTime.fromISO(project.dueAt).toJSDate() : null}
          displayFunction={date => {
            const dateTime = DateTime.fromJSDate(date);
            return `${dateTime.monthShort} ${dateTime.day}`;
          }}
          isOpen={isDueAtDatepickerOpen}
          onChange={value => {
            const timestamp = DateTime
              .fromJSDate(value)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
              .toISO();
            patchProject({
              id: project.id,
              dueAt: timestamp,
            });
          }}
          onClose={() => setIsDueAtDatepickerOpen(false)}
          onRemoveValue={e => {
            e.stopPropagation();
            patchProject({
              id: project.id,
              dueAt: null,
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
              onClick={() => createProject(project)}
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
                patchProject({
                  id: project.id,
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
              onClick={() => deleteProject(project.id)}
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
