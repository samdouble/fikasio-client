import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import usePrevious from 'use-previous';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import isEqual from 'lodash.isequal';
import { DateTime } from 'luxon';
import { AutosaveTextarea, Checkbox, DatePicker } from '@fikasio/react-ui-components';
import ProjectTag from 'components/projects/ProjectTag';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { Task } from 'services/tasks/types';
import AssigneeButton from './AssigneeButton';

export interface TaskRowProps {
  isSelected?: boolean;
  onAddTask: (task: Task) => Promise<void>;
  onEnterProgress: (task: Task) => Promise<void>;
  onClick: (taskId: string) => Promise<void>;
  onSelect: (task: Task) => Promise<void>;
  projectId?: string;
  task: any;
}

const TaskRow = ({
  isSelected,
  onAddTask,
  onEnterProgress,
  onClick,
  onSelect,
  projectId,
  task: pTask,
}: TaskRowProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const prevPTask = usePrevious(pTask);
  const [task, setTask] = useState(pTask);
  const [description, setIDescription] = useState((task && task.description) || '');
  const [hasFocus, setHasFocus] = useState(false);
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);

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
        operations.tasks.deleteTask(updatedTask.id)(dispatch);
      }
    } else if (e.target.textContent !== '') {
      operations.tasks.createTask({
        description: e.target.textContent,
      })(dispatch);
    }
  };

  const handleTaskStatusChange = async (updatedTask, status) => {
    if (updatedTask.id) {
      operations.tasks.patchTask(updatedTask.id, {
        status,
      })(dispatch);
    } else {
      operations.tasks.createTask({
        ...updatedTask,
        type: 'Instance',
        status,
      })(dispatch);
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
              operations.tasks.patchTask(task.id, {
                ...task,
                description: value,
              })(dispatch);
            } else {
              operations.tasks.createTask({
                ...task,
                description: value,
              })(dispatch)
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
      <td width={140}>
        {
          task && task.projects && task.projects
            .map(p => (
              <ProjectTag
                key={p.id}
                projectId={p.id}
              />
            ))
        }
      </td>
      <td width={140}>
        {
          <select
            className="form-control"
            onChange={e => handleTaskStatusChange(task, e.target.value)}
            style={{
              appearance: 'none',
              backgroundColor: 'transparent',
              backgroundImage: 'linear-gradient(to top, #f9f9f9, #fff 33%)',
              border: 'none',
              cursor: 'pointer',
              lineHeight: 1.1,
              outline: 'none',
              padding: 3,
            }}
          >
            <option />
            <option value="Doing">{t('doing')}</option>
            <option value="Blocked">{t('blocked')}</option>
            <option value="Completed">{t('completed')}</option>
            <option value="Deleted">{t('deleted')}</option>
          </select>
        }
      </td>
      <td width={140}>
        <AssigneeButton
          assigneeId={task.assignee}
        />
      </td>
      <td
        onClick={() => onEnterProgress(task)}
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
              && (task.estimatedCompletionTime / 60).toString()
          }
          onBlur={() => handleBlur()}
          onFocus={() => handleFocus()}
          onSave={async value => {
            operations.tasks.patchTask(task.id, {
              estimatedCompletionTime: parseFloat(value) * 60,
            })(dispatch);
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
          width: 150,
        }}
      >
        <DatePicker
          defaultValue={task.dueAt ? DateTime.fromISO(task.dueAt).toJSDate() : null}
          isOpen={isDueAtDatepickerOpen}
          onChange={dueAt => {
            const timestamp = DateTime.fromJSDate(dueAt)
              .set({ hour: 23, minute: 59, second: 59, millisecond: 999 })
              .toISO();
            operations.tasks.patchTask(task.id, { dueAt: timestamp })(dispatch);
          }}
          onClose={() => setIsDueAtDatepickerOpen(false)}
          onRemoveValue={e => {
            e.stopPropagation();
            operations.tasks.patchTask(task.id, { dueAt: null })(dispatch);
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
              onClick={() => operations.tasks.createTask(task)(dispatch)}
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
                operations.tasks.patchTask(task.id, { isArchived: !isArchived })(dispatch);
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
              onClick={() => operations.tasks.deleteTask(task.id)(dispatch)}
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
