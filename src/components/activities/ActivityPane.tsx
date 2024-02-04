import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { DateTime } from 'luxon';
import uniqBy from 'lodash.uniqby';
import { DatePicker } from '@fikasio/react-ui-components';
import { operations } from 'services';
import { getActivities } from 'services/activities/endpoints';
import { Activity } from 'services/activities/types';
import { TemplateField } from 'services/templates/types';
import { RootState } from 'services/store';
import { getFormFieldForType, processFormData } from 'utils/forms';
import SuggestionsList from './SuggestionsList';
import './ActivityPane.scss';

export interface ActivityPaneProps {
  activity: Partial<Activity>,
}

const ActivityPane = ({
  activity: activityProp,
}: ActivityPaneProps) => {
  const dispatch = useDispatch();
  const activities = useSelector((state: RootState) => state.activities);
  const tasks = useSelector((state: RootState) => state.tasks);
  const templates = useSelector((state: RootState) => state.templates);
  const login = useSelector((state: RootState) => state.login);
  const me = login.user;
  const activity = activityProp.id
    ? (activities || []).find(a => a.id === activityProp.id)
    : activityProp;
  const [startTime, setStartTime] = useState(
    activity && activity.startTime
      ? DateTime.fromISO(activity.startTime).toJSDate()
      : null,
  );
  const [endTime, setEndTime] = useState(
    activity && activity.endTime
      ? DateTime.fromISO(activity.endTime).toJSDate()
      : null,
  );
  const [comments, setComments] = useState(activity?.comments);
  const [templateId, setTemplateId] = useState(activity?.templateId);
  const [commentsSuggestions, setCommentsSuggestions] = useState<Activity[]>([]);
  const template = templates?.find(t => t.id === templateId);
  const { t } = useTranslation();

  const activityTasks = activity && activity.tasks;

  const handleChangeComments = e => {
    const text = e.target.value;
    if (text.length >= 3) {
      getActivities(null, { endTime: -1 }, text)
        .then((res: { activities: Activity[] }) => {
          const suggestedActivities = uniqBy(res.activities, el => el.comments)
            .filter(suggestedActivity => (
              !me.censoredWords
                .some(censoredWord => suggestedActivity.comments.toLowerCase().includes(censoredWord.toLowerCase()))
            ));
          setCommentsSuggestions(suggestedActivities);
        });
    } else {
      setCommentsSuggestions([]);
    }
  };

  const handleChangeTemplate = tId => {
    setTemplateId(tId);
  };

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (formData.durationUnits === 'hours') {
      formData.duration *= 60;
    }
    delete formData.durationUnits;
    if (!Object.keys(formData).includes('templateId')) {
      formData.templateId = null;
    }

    formData.tasks = (formData.tasks || [])
      .map(t1 => ({
        ...t1,
        duration: parseInt(t1.duration, 10),
      }));

    if (activity?.id) {
      operations.activities.updateActivity(activity?.id, formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    } else {
      operations.activities.createActivity(formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    }
  };

  const activityWithInitialValues = {
    ...activity,
    values: template?.fields
      .map((field: TemplateField) => ({
        fieldId: field.id,
        value: activity?.values?.find(v => v.fieldId === field.id)?.value,
      })),
  };

  return (
    <Form
      initialValues={activityWithInitialValues}
      keepDirtyOnReinitialize
      mutators={{
        ...arrayMutators,
        setComments: (args, state, utils) => {
          const [newComment] = args;
          utils.changeValue(state, 'comments', () => newComment);
        },
        setDuration: (args, state, utils) => {
          const [newDuration] = args;
          utils.changeValue(state, 'number:duration', () => newDuration);
        },
      }}
      onSubmit={onSubmit}
      render={({ form, handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h4>{ activity && activity.name }</h4>
          <RBForm.Group>
            <RBForm.Label>{t('time')}</RBForm.Label>
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd HH:mm"
                    onChange={date => {
                      const timestamp = DateTime.fromJSDate(date)
                        .set({ millisecond: 0 });
                      if (activity?.id) {
                        dispatch(
                          operations.activities.patchActivity(activity?.id, {
                            startTime: timestamp.toISO(),
                          }),
                        );
                      }
                      setStartTime(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                      if (endTime && timestamp) {
                        const end = DateTime.fromJSDate(endTime);
                        form.mutators.setDuration(end.diff(timestamp, 'minutes').minutes);
                      }
                    }}
                    selected={startTime}
                    showTimeSelect
                    timeCaption="Heure"
                    timeFormat="HH:mm"
                    timeIntervals={15}
                  />
                )
              }
              defaultValue={startTime}
              name="startTime"
            />
            <br />
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd HH:mm"
                    onChange={date => {
                      const timestamp = DateTime.fromJSDate(date)
                        .set({ millisecond: 0 });
                      if (activity?.id) {
                        operations.activities.patchActivity(activity?.id, { endTime: timestamp.toISO() })(dispatch);
                      }
                      setEndTime(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                      if (startTime && timestamp) {
                        const start = DateTime.fromJSDate(startTime);
                        form.mutators.setDuration(timestamp.diff(start, 'minutes').minutes);
                      }
                    }}
                    selected={endTime}
                    showTimeSelect
                    timeCaption={t('time')}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                  />
                )
              }
              defaultValue={endTime}
              name="endTime"
            />
          </RBForm.Group>
          <br />
          <br />
          <RBForm.Group>
            <RBForm.Label>{t('duration')}</RBForm.Label>
            <table>
              <tbody>
                <tr>
                  <td>
                    <Field
                      className="form-control"
                      component="input"
                      defaultValue={activity && activity.duration}
                      name="number:duration"
                      style={{ width: 100 }}
                    />
                  </td>
                  <td>
                    <Field
                      className="form-control"
                      component="select"
                      name="durationUnits"
                      style={{ width: 250 }}
                    >
                      <option value="minutes">{t('minutes')}</option>
                      <option value="hours">{t('hours')}</option>
                    </Field>
                  </td>
                </tr>
              </tbody>
            </table>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('template')}</RBForm.Label>
            <Field
              className="form-control"
              component="select"
              defaultValue={templateId}
              name="templateId"
              style={{ width: 250 }}
            >
              {
                ({ input }) => {
                  return (
                    <select
                      className="form-control"
                      defaultValue={input.value}
                      name={input.name}
                      onChange={e => {
                        input.onChange(e);
                        handleChangeTemplate(e.target.value);
                      }}
                    >
                      <option />
                      {
                        templates?.sort((t1, t2) => (t1.name < t2.name ? -1 : 1))
                          .map(t1 => (
                            <option
                              key={t1.id}
                              value={t1.id}
                            >
                              { t1.name }
                            </option>
                          ))
                      }
                    </select>
                  );
                }
              }
            </Field>
          </RBForm.Group>
          {
            template && (
              <RBForm.Group>
                <FieldArray name="values">
                  {
                    ({ fields }) => (
                      <div>
                        {
                          fields
                            .map((name, index) => (
                              <div key={name as string}>
                                <RBForm.Label>
                                  {template?.fields[index].name}
                                </RBForm.Label>
                                <Field name={`${name}.fieldId`}>
                                  {
                                    ({ input }) => (
                                      <input
                                        {...input}
                                        type="hidden"
                                        name={`${name}.fieldId`}
                                      />
                                    )
                                  }
                                </Field>
                                {
                                  getFormFieldForType(
                                    `${name}.value`,
                                    template?.fields[index].type,
                                  )
                                }
                              </div>
                            ))
                        }
                      </div>
                    )
                  }
                </FieldArray>
              </RBForm.Group>
            )
          }
          <RBForm.Group>
            <RBForm.Label>{t('comments')}</RBForm.Label>
            <Field
              component="textarea"
              className="form-control"
              name="comments"
              onInput={handleChangeComments}
              rows={6}
              value={comments}
            />
          </RBForm.Group>
          <SuggestionsList
            maxLength={10}
            onSelectSuggestion={suggestion => {
              setComments(suggestion.comments);
              form.mutators.setComments(suggestion.comments);
            }}
            suggestions={commentsSuggestions}
          />
          <RBForm.Group>
            <RBForm.Label>{t('tasks')}</RBForm.Label>
            <FieldArray
              className="form-control"
              defaultValue={activityTasks}
              name="tasks"
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
                                    tasks?.filter(t1 => !t1.isArchived)
                                      .sort((t1, t2) => (
                                        t1.description.toLowerCase().localeCompare(t2.description.toLowerCase())
                                      ))
                                      .map(task => (
                                        <option
                                          key={task.id}
                                          value={task.id}
                                        >
                                          {task.description}
                                        </option>
                                      ))
                                  }
                                </Field>
                              </td>
                              <td>
                                <Field
                                  className="form-control"
                                  component="input"
                                  name={`${name}.duration`}
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
          <div
            style={{
              bottom: 10,
              float: 'right',
              paddingBottom: 15,
              position: 'fixed',
              right: 30,
            }}>
            <Button
              onClick={() => dispatch(operations.pane.clearPaneContent())}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            {
              activity
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default ActivityPane;
