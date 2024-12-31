import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import usePrevious from 'use-previous';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'lodash.isequal';
import { DateTime } from 'luxon';
import { AutosaveTextarea, Checkbox, DatePicker, Select, Selector } from '@fikasio/react-ui-components';
import ProjectTag from 'components/projects/ProjectTag';
import AssigneeButton from 'components/tasks/TasksViewer/AssigneeButton';
import DropdownToggle from 'components/UI/DropdownToggle';
import { useGetProjectsQuery } from 'services/projects/api';
import { useAddTaskMutation, usePatchTaskMutation, useDeleteTaskMutation } from 'services/tasks/api';
import { Task } from 'services/tasks/types';
import { round } from 'utils/maths';

export interface TaskRowProps {
  isSelected?: boolean;
  onAddTask: (task: Task) => Promise<void>;
  onClick: (taskId: string) => Promise<void>;
  onSelect: (task: Task) => Promise<void>;
  projectId?: string;
  task: any;
}

const TaskRow = ({
  isSelected,
  onAddTask,
  onClick,
  onSelect,
  projectId,
  task: pTask,
}: TaskRowProps) => {
  const { t } = useTranslation();
  const { data: projects } = useGetProjectsQuery();

  const prevPTask = usePrevious(pTask);
  const [task, setTask] = useState(pTask);
  const [description, setIDescription] = useState((task && task.description) || '');
  const [hasFocus, setHasFocus] = useState(false);
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);

  const [createTask] = useAddTaskMutation();
  const [patchTask] = usePatchTaskMutation();
  const [deleteTask] = useDeleteTaskMutation();

  useEffect(() => {
    if (!isEqual(pTask, prevPTask)) {
      setTask({
        ...task,
        ...pTask,
      });
    }
  }, [pTask]);

  useEffect(() => {
    if (!hasFocus) {
      setIDescription(task.description);
    }
  }, [task]);

  const handleBlur = () => {
    setHasFocus(false);
  };

  const handleFocus = () => {
    setHasFocus(true);
  };

  const handleKeyDownDescription = (e, updatedTask) => {
    if (e.key === 'Enter') {
      onAddTask({
        type: 'Template',
        description: '',
        dueAt: updatedTask.dueAt,
        ...(projectId && { projects: [{ id: projectId }] }),
      });
      e.preventDefault();
    }
  };

  const handleKeyUpDescription = (e, updatedTask) => {
    if (updatedTask) {
      if (e.key === 'Backspace' && e.target.textContent === '') {
        deleteTask(updatedTask.id);
      }
    } else if (e.target.textContent !== '') {
      createTask({
        description: e.target.textContent,
      });
    }
  };

  const handleTaskStatusChange = async (updatedTask, status) => {
    if (updatedTask.id) {
      patchTask({
        id: updatedTask.id,
        status,
      });
    } else {
      createTask({
        ...updatedTask,
        type: 'Instance',
        status,
      });
    }
  };

  const hasdueAtPassed = task
    && task.status !== 'Completed'
    && task.dueAt
    && DateTime.fromISO(task.dueAt) < DateTime.now();

  return (
    <tr
      className={classNames({
        taskRow: true,
        done: task && task.status === 'Completed',
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
          onClick={() => onSelect(task)}
        />
      </td>
      <td
        className="taskRow_description"
        onClick={() => onClick && onClick(task.id)}
        style={{
          cursor: 'pointer',
        }}
      >
        <AutosaveTextarea
          className={classNames({
            taskRow_description_editable: true,
            [task.id]: true,
          })}
          defaultValue={description}
          onBlur={() => handleBlur()}
          onFocus={() => handleFocus()}
          onKeyDown={e => handleKeyDownDescription(e, task)}
          onKeyUp={e => handleKeyUpDescription(e, task)}
          onSave={async value => {
            if (task.id) {
              patchTask({
                id: task.id,
                ...task,
                description: value,
              });
            } else {
              createTask({
                ...task,
                description: value,
              })
                .then(resultTask => setTask(resultTask));
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
          task && task.projects && task.projects
            .map(p => (
              <ProjectTag
                key={p.id}
                projectId={p.id}
              />
            ))
        }
        <Selector
          Component={(
            <div
              style={{
                border: '1px solid #cecece',
                borderRadius: '50%',
                cursor: 'pointer',
                height: 25,
                marginTop: 3,
                padding: 5,
                width: 25,
              }}
            >
              <span
                style={{
                  position: 'relative',
                  top: -5,
                  left: 2,
                }}
              >
                +
              </span>
            </div>
          )}
          options={projects?.map(p => p.name)}
          value={task.projects}
        />
      </td>
      <td width={140}>
        {
          <Select
            defaultValue={task.status}
            onChange={value => handleTaskStatusChange(task, value)}
            options={[
              { label: '-', value: null },
              { label: t('doing'), value: 'Doing' },
              { label: t('blocked'), value: 'Blocked' },
              { label: t('completed'), value: 'Completed' },
              { label: t('deleted'), value: 'Deleted' },
            ]}
            style={{
              border: 'none',
            }}
          />
        }
      </td>
      <td
        style={{
          cursor: 'pointer',
          width: 90,
        }}
      >
        <FontAwesomeIcon
          icon="stopwatch"
          size="1x"
          style={{ marginRight: 10 }}
        />
        <AutosaveTextarea
          defaultValue={
            task
              && task.estimatedCompletionTime
              && (round(task.estimatedCompletionTime / 60, 2)).toString()
          }
          onBlur={() => handleBlur()}
          onFocus={() => handleFocus()}
          onSave={async value => {
            patchTask({
              id: task.id,
              estimatedCompletionTime: parseFloat(value) * 60,
            });
          }}
          style={{
            display: 'inline-block',
            height: 25,
            minWidth: 25,
            overflowY: 'hidden',
            padding: 0,
            width: 'auto',
          }}
          useContentEditableDiv
        />
      </td>
      <td
        className="taskRow_dueAt"
        onClick={() => setIsDueAtDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
          ...(hasdueAtPassed && { color: '#ff0000' }),
          width: 120,
        }}
      >
        <DatePicker
          defaultValue={task.dueAt ? DateTime.fromISO(task.dueAt).toJSDate() : null}
          displayFunction={date => {
            const dateTime = DateTime.fromJSDate(date);
            return `${dateTime.monthShort} ${dateTime.day}`;
          }}
          isOpen={isDueAtDatepickerOpen}
          onChange={dueAt => {
            const timestamp = DateTime.fromJSDate(dueAt)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
              .toISO();
            patchTask({
              id: task.id,
              dueAt: timestamp,
            });
          }}
          onClose={() => setIsDueAtDatepickerOpen(false)}
          onRemoveValue={e => {
            e.stopPropagation();
            patchTask({
              id: task.id,
              dueAt: null,
            });
          }}
          shouldCloseOnSelect
          showRemoveValue
          showTimeSelect={false}
        />
      </td>
      <td width={35}>
        <AssigneeButton
          assigneeId={task.assignee}
        />
      </td>
      <td
        style={{
          textAlign: 'center',
        }}
        width={30}
      >
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => createTask(task)}
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
                const isArchived = task.isArchived || false;
                patchTask({
                  id: task.id,
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
              onClick={() => deleteTask(task.id)}
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

export default TaskRow;
