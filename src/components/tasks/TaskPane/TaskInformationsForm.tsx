import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Switch from 'react-input-switch';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import omit from 'lodash.omit';
import { DateTime } from 'luxon';
import { DatePicker, Select } from '@fikasio/react-ui-components';
import { clearPaneContent } from 'services/pane/slice';
import { useGetProjectsQuery } from 'services/projects/api';
import { useAddTaskMutation, usePatchTaskMutation, useUpdateTaskMutation } from 'services/tasks/api';
import { Task } from 'services/tasks/types';
import { processFormData } from 'utils/forms';

interface TaskInformationsFormProps {
  onClose?: () => void;
  projectId?: string;
  task?: Task;
}

const TaskInformationsForm = ({
  onClose,
  projectId,
  task,
}: TaskInformationsFormProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: projects } = useGetProjectsQuery();
  const [hasRecurrence, setHasRecurrence] = useState(false);
  const [startAt, setStartAt] = useState(
    task && task.startAt
    ? DateTime.fromISO(task.startAt).toJSDate()
    : null,
  );
  const [dueAt, setDueAt] = useState(
    task && task.dueAt
    ? DateTime.fromISO(task.dueAt).toJSDate()
    : null,
  );

  const [createTask] = useAddTaskMutation();
  const [patchTask] = usePatchTaskMutation();
  const [updateTask] = useUpdateTaskMutation();

  const taskProjects = task
    ? task.projects
    : (projectId && projects?.find(p => p.id === projectId) ? [{ id: projectId }] : []);

  const detailsTextarea = useRef(null);
  const [detailsTextareaHeight, setDetailsTextareaHeight] = useState(3); 
  
  const setTextareaHeight = element => {
    const rowHeight = 25;
    const maxNbRows = 10;
    const height = element.scrollHeight;
    const trows = Math.ceil(height / rowHeight) - 1;
    setDetailsTextareaHeight(Math.min(maxNbRows, trows));
  };

  useEffect(() => {
    if (detailsTextarea && detailsTextarea.current) {
      const element: HTMLTextAreaElement = detailsTextarea.current;
      setTextareaHeight(element);
    }
  }, [detailsTextarea]);

  const handleDetailsChange = event => {
    setTextareaHeight(event.target)
  };

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (formData.estimatedCompletionTime && formData.estimatedCompletionTimeUnits === 'hours') {
      formData.estimatedCompletionTime *= 60;
    }
    if (task && task.id) {
      updateTask({
        id: task.id,
        ...omit(formData, ['estimatedCompletionTimeUnits']),
      })
        .then(() => dispatch(clearPaneContent()));
    } else {
      createTask(
        omit(formData, ['estimatedCompletionTimeUnits']),
      )
        .then(() => dispatch(clearPaneContent()));
    }
  };

  return (
    <Form
      initialValues={task}
      keepDirtyOnReinitialize
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RBForm.Group>
            <RBForm.Label>{t('details')}</RBForm.Label>
            <Field
              component="textarea"
              name="details"
            >
              {
                ({ input }) => (
                  <textarea
                    {...input}
                    className="form-control"
                    name="details"
                    onChange={e => {
                      input.onChange(e);
                      handleDetailsChange(e);
                    }}
                    ref={detailsTextarea}
                    rows={detailsTextareaHeight}
                  />
                )
              }
            </Field>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('startDate')}</RBForm.Label>
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    defaultValue={startAt}
                    displayFormat="yyyy-MM-dd"
                    onChange={value => {
                      const timestamp = DateTime.fromJSDate(value)
                        .set({ hour: 0, minute: 0, second: 0 });
                      if (task && task.id) {
                        patchTask({
                          id: task.id,
                          startAt: timestamp.toISO(),
                        });
                      }
                      setStartAt(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                    }}
                    popperProps={{
                      positionFixed: true,
                    }}
                  />
                )
              }
              defaultValue={startAt}
              name="startAt"
            />
          </RBForm.Group>
          <br />
          <RBForm.Group>
            <RBForm.Label>{t('dueDate')}</RBForm.Label>
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    defaultValue={dueAt}
                    displayFormat="yyyy-MM-dd"
                    onChange={value => {
                      const timestamp = DateTime.fromJSDate(value)
                        .set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
                      if (task && task.id) {
                        patchTask({
                          id: task.id,
                          dueAt: timestamp.toISO(),
                        });
                      }
                      setDueAt(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                    }}
                    popperProps={{
                      positionFixed: true,
                    }}
                  />
                )
              }
              defaultValue={dueAt}
              name="dueAt"
            />
          </RBForm.Group>
          <br />
          <RBForm.Group>
            <RBForm.Label>{t('estimatedCompletionTime')}</RBForm.Label>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Field
                      className="form-control"
                      component="input"
                      defaultValue={task && task.estimatedCompletionTime}
                      name="number:estimatedCompletionTime"
                      style={{
                        width: 100,
                      }}
                    />
                  </td>
                  <td>
                    <Field
                      component={
                        ({ input }) => {
                          return (
                            <Select
                              defaultValue={input.value}
                              onChange={value => input.onChange(value)}
                              options={[
                                { label: t('minutes'), value: 'minutes' },
                                { label: t('hours'), value: 'hours' },
                              ]}
                              style={{
                                minWidth: 300,
                              }}
                            />
                          )
                        }
                      }
                      name="estimatedCompletionTimeUnits"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('projects')}</RBForm.Label>
            <FieldArray
              className="form-control"
              defaultValue={taskProjects}
              name="projects"
            >
              {({ fields }) => {
                return (
                  <div>
                    {
                      fields.map((name, index) => (
                        <table key={name}>
                          <tbody>
                            <tr>
                              <td>
                                <Field
                                  component={
                                    ({ input }) => {
                                      return (
                                        <Select
                                          defaultValue={input.value}
                                          onChange={value => input.onChange(value)}
                                          options={
                                            projects?.filter(p => !p.isArchived)
                                              .sort((p1, p2) => (
                                                p1.name.toLowerCase().localeCompare(p2.name.toLowerCase())
                                              ))
                                              .map(p => ({
                                                label: p.name,
                                                value: p.id,
                                              }))
                                          }
                                          style={{
                                            minWidth: 300,
                                          }}
                                        />
                                      )
                                    }
                                  }
                                  name={`${name}.id`}
                                />
                              </td>
                              <td width={35}>
                                <FontAwesomeIcon
                                  icon="times"
                                  onClick={() => fields.remove(index)}
                                  size="1x"
                                  style={{
                                    color: '#ce0000',
                                    cursor: 'pointer',
                                    marginLeft: 10,
                                  }}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      ))
                    }
                    <Button
                      onClick={() => fields.push({ id: '' })}
                    >
                      {t('add')}
                    </Button>
                  </div>
                );
              }}
            </FieldArray>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('recurrence')}</RBForm.Label>
            <Switch
              onChange={setHasRecurrence}
              style={{ marginLeft: 5 }}
              value={hasRecurrence}
            />
            {
              !!hasRecurrence && (
                <>
                  <RBForm.Check
                    id="recurrence"
                    label={t('monday')}
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label={t('tuesday')}
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label={t('wednesday')}
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label={t('thursday')}
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label={t('friday')}
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label={t('saturday')}
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label={t('sunday')}
                    type="radio"
                  />
                </>)
            }
          </RBForm.Group>
          <div
            style={{
              bottom: 10,
              float: "right",
              paddingBottom: 15,
              position: "fixed",
              right: 30,
            }}
          >
            <Button
              onClick={() => onClose && onClose()}
              style={{
                backgroundColor: 'white',
              }}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            {
              task
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default TaskInformationsForm;
