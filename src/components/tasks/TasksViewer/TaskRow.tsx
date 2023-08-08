import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import ContentEditable from 'react-contenteditable';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DateTime, Duration } from 'luxon';
import useTimeout from 'use-timeout';
import ProjectTag from 'components/projects/ProjectTag';
import Checkbox from 'components/UI/Checkbox';
import Datepicker from 'components/UI/Datepicker';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { RootState } from 'services/store';
import AssigneeButton from './AssigneeButton';

const TaskRow = ({
  index,
  onAddTask,
  onEnterProgress,
  onSelect,
  projectId,
  task,
}) => {
  const tasks = useSelector((state: RootState) => state.tasks);
  const dispatch = useDispatch();
  const [description, setIDescription] = useState((task && task.description) || '');
  const [delay, setDelay] = useState<number | null>(null);
  const [, setSaved] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);
  const [isDueAtDatepickerOpen, setIsDueAtDatepickerOpen] = useState(false);

  useTimeout(() => {
    saveDescription();
    setDelay(null);
  }, delay);

  useEffect(() => {
    if (!hasFocus) {
      setIDescription(task.description);
    }
  }, [task]);

  const setDescription = val => {
    setDelay(400);
    setIDescription(val);
  };

  const saveDescription = () => {
    if (task && description !== '' && description !== task.description) {
      operations.tasks.patchTask(task.id, { description })(dispatch) // TODO date: updatedTask.date
        .then(() => setSaved(true));
    }
	};

  const handleBlur = () => {
    setHasFocus(false);
  };

  const handleFocus = () => {
    setHasFocus(true);
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') {
      onAddTask({
        type: 'Template',
        description: '',
        ...(projectId && { projects: [{ id: projectId }] }),
      });
      e.preventDefault();
    }
  };

  const handleKeyUp = (e, updatedTask) => {
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

  const toggleCheckTaskClick = async task => {
    const taskIfExists = tasks?.find(t => t.id === task.id && t.dueAt === task.dueAt);
    if (task.id) {
      operations.tasks.patchTask(task.id, {
        isCompleted: !taskIfExists?.isCompleted,
      })(dispatch);
    } else {
      operations.tasks.createTask({
        ...task,
        type: 'Instance',
        isCompleted: true,
      })(dispatch);
    }
  };

  const toggleCheckTaskKey = async (e, task) => {
    if (e.key === 'Enter') {
      toggleCheckTaskClick(task);
    }
  };

  const hasdueAtPassed = task
    && !task.isCompleted
    && task.dueAt
    && DateTime.fromISO(task.dueAt) < DateTime.now();

  return (
    <tr className={classNames({
      taskRow: true,
      done: task && task.isCompleted,
    })}>
      <td width={35}>
        <div
          onClick={() => toggleCheckTaskClick(task)}
          onKeyUp={e => toggleCheckTaskKey(e, task)}
          role="button"
          tabIndex={2 * index}
        >
          {
            task && (
              <Checkbox
                isChecked={task.isCompleted}
              />
            )
          }
        </div>
      </td>
      <td
        className="taskRow_description"
        onClick={() => onSelect && onSelect(task.id)}
        style={{ cursor: 'pointer' }}
      >
        <ContentEditable
          id={task.id}
          className={classNames({
            taskRow_description_editable: true,
            [task.id]: true,
          })}
          html={description}
          onBlur={() => handleBlur()}
          onFocus={() => handleFocus()}
          onKeyUp={e => handleKeyUp(e, task)}
          onKeyDown={e => handleKeyDown(e)}
          onChange={e => setDescription(e.target.value)}
          onClick={e => e.stopPropagation()}
          style={{
            float: 'left',
            outline: 'none',
            paddingLeft: 5,
            paddingRight: 50,
            minWidth: 'auto',
            cursor: 'auto',
          }}
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
        <AssigneeButton
          assigneeId={task.assignee}
        />
      </td>
      <td
        width={90}
        onClick={() => onEnterProgress(task)}
        style={{ cursor: 'pointer' }}
      >
        <FontAwesomeIcon
          icon="stopwatch"
          size="1x"
          style={{ marginRight: 10 }}
        />
        {
          task
            && task.estimatedCompletionTime
            && Duration.fromMillis(task.estimatedCompletionTime * 60 * 1000).toFormat('h:mm')
        }
      </td>
      <td
        className="taskRow_dueAt"
        width={140}
        onClick={() => setIsDueAtDatepickerOpen(true)}
        style={{
          cursor: 'pointer',
          ...(hasdueAtPassed && { color: '#ff0000' }),
        }}
      >
        <Datepicker
          defaultValue={task.dueAt ? DateTime.fromISO(task.dueAt).toMillis() : null}
          isOpen={isDueAtDatepickerOpen}
          onChange={dueAt => {
            const timestamp = DateTime.fromJSDate(dueAt)
              .set({ hour: 23, minute: 59, second: 59 })
              .toISO();
            operations.tasks.patchTask(task.id, { dueAt: timestamp })(dispatch);
          }}
        />
        <FontAwesomeIcon
          icon="calendar-alt"
          size="1x"
          style={{ marginRight: 10 }}
        />
        {task && task.dueAt && DateTime.fromISO(task.dueAt).toFormat('yyyy-MM-dd')}
        {
          task && task.dueAt && (
            <FontAwesomeIcon
              className='taskRow_dueAt_remove'
              icon="times"
              size="1x"
              onClick={e => {
                e.stopPropagation();
                operations.tasks.patchTask(task.id, { dueAt: null })(dispatch);
              }}
            />
          )
        }
      </td>
      <td width={35}>
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
              Copier
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
              Archiver
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
              Supprimer
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </td>
    </tr>
  );
};

export default TaskRow;
