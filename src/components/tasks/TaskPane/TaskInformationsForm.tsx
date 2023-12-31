import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Switch from 'react-input-switch';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import DatePicker from 'react-datepicker';
import omit from 'lodash.omit';
import { DateTime } from 'luxon';
import { operations } from 'services';
import { Task } from 'services/tasks/types';
import { RootState } from 'services/store';
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
  const projects = useSelector((state: RootState) => state.projects);
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

  const detailsTextarea = useRef(null);
  const [detailsTextareaHeight, setDetailsTextareaHeight] = useState(1); 
  
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

  const taskProjects = task
    ? task.projects
    : (projectId && projects?.find(p => p.id === projectId) ? [{ id: projectId }] : []);

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (formData.estimatedCompletionTime && formData.estimatedCompletionTimeUnits === 'hours') {
      formData.estimatedCompletionTime *= 60;
    }
    if (task && task.id) {
      operations.tasks.updateTask(task.id,
        omit(formData, ['estimatedCompletionTimeUnits']),
      )(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    } else {
      operations.tasks.createTask(
        omit(formData, ['estimatedCompletionTimeUnits']),
      )(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
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
            <RBForm.Label>Détails</RBForm.Label>
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
          {
            /*
            <RBForm.Group>
              <RBForm.Label>Statut</RBForm.Label>
              <br />
              <Field
                name="status"
                component="select"
                className="form-control"
                style={{ width: 250 }}
              >
                <option value="ACTIVE">En cours</option>
                <option value="BLOCKED">Bloquée</option>
                <option value="COMPLETED">Complétée</option>
              </Field>
            </RBForm.Group>
            */
          }
          <RBForm.Group>
            <RBForm.Label>Date de début</RBForm.Label>
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    onChange={value => {
                      const timestamp = DateTime.fromJSDate(value)
                        .set({ hour: 0, minute: 0, second: 0 });
                      if (task && task.id) {
                        operations.tasks.patchTask(task.id, { startAt: timestamp.toISO() })(dispatch);
                      }
                      setStartAt(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                    }}
                    selected={startAt}
                  />
                )
              }
              defaultValue={startAt}
              name="startAt"
            />
          </RBForm.Group>
          <br />
          <br />
          <RBForm.Group>
            <RBForm.Label>Échéance</RBForm.Label>
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    onChange={value => {
                      const timestamp = DateTime.fromJSDate(value)
                        .set({ hour: 23, minute: 59, second: 59 });
                      if (task && task.id) {
                        operations.tasks.patchTask(task.id, { dueAt: timestamp.toISO() })(dispatch);
                      }
                      setDueAt(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                    }}
                    selected={dueAt}
                  />
                )
              }
              defaultValue={dueAt}
              name="dueAt"
            />
          </RBForm.Group>
          <br />
          <br />
          <RBForm.Group>
            <RBForm.Label>Temps de complétion estimé</RBForm.Label>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Field
                      className="form-control"
                      component="input"
                      defaultValue={task && task.estimatedCompletionTime}
                      name="number:estimatedCompletionTime"
                      style={{ width: 100 }}
                    />
                  </td>
                  <td>
                    <Field
                      className="form-control"
                      component="select"
                      name="estimatedCompletionTimeUnits"
                      style={{ width: 250 }}
                    >
                      <option value="minutes">minutes</option>
                      <option value="hours">heures</option>
                    </Field>
                  </td>
                </tr>
              </tbody>
            </table>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Projets</RBForm.Label>
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
                                  className="form-control"
                                  component="select"
                                  name={`${name}.id`}
                                >
                                  <option />
                                  {
                                    projects?.filter(p => !p.isArchived)
                                      .sort((p1, p2) => (p1.name.toLowerCase().localeCompare(p2.name.toLowerCase())))
                                      .map(project => (
                                        <option
                                          key={project.id}
                                          value={project.id}
                                        >
                                          {project.name}
                                        </option>
                                      ))
                                  }
                                </Field>
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
            <RBForm.Label>Récurrence</RBForm.Label>
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
                    label="Lundi"
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label="Mardi"
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label="Mercredi"
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label="Jeudi"
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label="Vendredi"
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label="Samedi"
                    type="radio"
                  />
                  <RBForm.Check
                    id="recurrence"
                    label="Dimanche"
                    type="radio"
                  />
                </>)
            }
          </RBForm.Group>
          <div
            style={{
              bottom: 10,
              float: 'right',
              paddingBottom: 15,
              position: 'fixed',
              right: 30,
            }}
          >
            <Button
              onClick={() => onClose && onClose()}
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
