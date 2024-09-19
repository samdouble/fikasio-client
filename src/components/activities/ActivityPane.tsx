import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { DateTime } from 'luxon';
import uniqBy from 'lodash.uniqby';
import usePrevious from 'use-previous';
import { DatePicker, Select } from '@fikasio/react-ui-components';
import {
  useGetActivitiesQuery,
  useLazyGetActivitiesQuery,
  useAddActivityMutation,
  useUpdateActivityMutation,
  usePatchActivityMutation,
} from 'services/activities/api';
import { Activity } from 'services/activities/types';
import { useAuth } from 'services/login/hooks';
import { clearPaneContent } from 'services/pane/slice';
import { useGetProjectsQuery } from 'services/projects/api';
import { useGetTasksQuery } from 'services/tasks/api';
import { useGetTemplatesQuery } from 'services/templates/api';
import { TemplateField } from 'services/templates/types';
import { getFormFieldForType, processFormData } from 'utils/forms';
import SuggestionsList from './SuggestionsList';
import './ActivityPane.scss';

export interface ActivityPaneProps {
  activity: Partial<Activity>,
}

const ActivityPane = ({
  activity: pActivity,
}: ActivityPaneProps) => {
  const dispatch = useDispatch();
  const { data: activities } = useGetActivitiesQuery({});
  const { data: projects } = useGetProjectsQuery();
  const { data: tasks } = useGetTasksQuery({});
  const { data: templates } = useGetTemplatesQuery();
  const auth = useAuth();
  const me = auth.user;
  const activity = pActivity.id
    ? (activities || []).find(a => a.id === pActivity.id)
    : pActivity;
  const prevActivity = usePrevious(activity);
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
  const prevComments = usePrevious(comments);
  const [templateId, setTemplateId] = useState(activity?.templateId);
  const [commentsSuggestions, setCommentsSuggestions] = useState<Activity[]>([]);
  const template = templates?.find(t => t.id === templateId);
  const { t } = useTranslation();

  useEffect(() => {
    if (activity && !prevActivity) {
      if (activity.comments) {
        setComments(activity.comments);
      }
      if (activity.endTime) {
        setEndTime(DateTime.fromISO(activity.endTime).toJSDate());
      }
      if (activity.startTime) {
        setComments(DateTime.fromISO(activity.startTime).toJSDate());
      }
      if (activity.templateId) {
        setTemplateId(activity.templateId);
      }
    }
  }, [activity]);

  const activityProjects = activity && activity.projects;

  const activityTasks = activity && activity.tasks;

  const [getActivities] = useLazyGetActivitiesQuery();
  const [createActivity] = useAddActivityMutation();
  const [patchActivity] = usePatchActivityMutation();
  const [updateActivity] = useUpdateActivityMutation();

  const handleChangeComments = e => {
    const text = e.target.value;
    if (text.length >= 3) {
      if (prevComments?.includes(text)) {
        setCommentsSuggestions(
          commentsSuggestions
            .filter(suggestedActivity => suggestedActivity.comments.toLowerCase().includes(text.toLowerCase()))
            .filter(suggestedActivity => (
              !me.censoredWords
                .some(censoredWord => suggestedActivity.comments.toLowerCase().includes(censoredWord.toLowerCase()))
            ))
        );
      } else {
        getActivities({
          filter: {},
          sort: { endTime: -1 },
          q: text,
        })
          .then(({ data }) => {
            const suggestedActivities = uniqBy(data, el => el.comments)
              .filter(suggestedActivity => (
                !me.censoredWords
                  .some(censoredWord => suggestedActivity.comments.toLowerCase().includes(censoredWord.toLowerCase()))
              ));
            setCommentsSuggestions(suggestedActivities);
          });
      }
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
      updateActivity({
        id: activity?.id,
        ...formData,
      })
        .then(() => dispatch(clearPaneContent()));
    } else {
      createActivity(formData)
        .then(() => dispatch(clearPaneContent()));
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
                    defaultValue={startTime}
                    displayFormat="yyyy-MM-dd HH:mm"
                    onChange={date => {
                      const timestamp = DateTime.fromJSDate(date)
                        .set({ millisecond: 0 });
                      if (activity?.id) {
                        dispatch(
                          patchActivity({
                            id: activity?.id,
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
                    showTimeSelect
                    timeCaption={t('hour')}
                    timeFormat="HH:mm"
                    timeIntervals={15}
                  />
                )
              }
              defaultValue={startTime}
              name="startTime"
            />
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    displayFormat="yyyy-MM-dd HH:mm"
                    defaultValue={endTime}
                    onChange={date => {
                      const timestamp = DateTime.fromJSDate(date)
                        .set({ millisecond: 0 });
                      if (activity?.id) {
                        patchActivity({
                          id: activity?.id,
                          endTime: timestamp.toISO(),
                        });
                      }
                      setEndTime(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                      if (startTime && timestamp) {
                        const start = DateTime.fromJSDate(startTime);
                        form.mutators.setDuration(timestamp.diff(start, 'minutes').minutes);
                      }
                    }}
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
                      component={
                        ({ input }) => {
                          return (
                            <Select
                              defaultValue={input.value}
                              menuPortalTarget={null}
                              onChange={value => input.onChange(value)}
                              options={[
                                { label: t('minutes'), value: 'minutes' },
                                { label: t('hours'), value: 'hours' },
                              ]}
                              style={{
                                width: 150,
                              }}
                            />
                          )
                        }
                      }
                      defaultValue="minutes"
                      name="durationUnits"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('template')}</RBForm.Label>
            <Field
              component={
                ({ input }) => {
                  return (
                    <Select
                      defaultValue={input.value}
                      menuPortalTarget={null}
                      onChange={value => {
                        input.onChange(value);
                        handleChangeTemplate(value);
                      }}
                      options={
                        [...(templates || [])]
                          .sort((t1, t2) => (t1.name < t2.name ? -1 : 1))
                          .map(t1 => ({
                            label: t1.name,
                            value: t1.id,
                          }))
                      }
                      style={{
                        width: 250,
                      }}
                    />
                  );
                }
              }
              defaultValue={templateId}
              name="templateId"
            />
          </RBForm.Group>
          {
            template && (
              <RBForm.Group>
                <FieldArray
                  name="values"
                >
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
            <RBForm.Label>{t('projects')}</RBForm.Label>
            <FieldArray
              className="form-control"
              defaultValue={activityProjects}
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
                                          menuPortalTarget={null}
                                          onChange={value => input.onChange(value)}
                                          options={
                                            projects?.filter(p => !p.isArchived)
                                              .sort((p1, p2) => (
                                                p1.name.toLowerCase().localeCompare(p2.name.toLowerCase())
                                              ))
                                              .map(project => ({
                                                label: project.name,
                                                value: project.id,
                                              }))
                                          }
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
                                  component={
                                    ({ input }) => {
                                      return (
                                        <Select
                                          defaultValue={input.value}
                                          onChange={value => input.onChange(value)}
                                          options={
                                            tasks?.filter(t1 => !t1.isArchived)
                                              .sort((t1, t2) => (
                                                t1.description.toLowerCase().localeCompare(t2.description.toLowerCase())
                                              ))
                                              .map(task => ({
                                                label: task.description,
                                                value: task.id,
                                              }))
                                          }
                                        />
                                      )
                                    }
                                  }
                                  name={`${name}.id`}
                                />
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
              onClick={() => dispatch(clearPaneContent())}
              style={{
                backgroundColor: 'white',
              }}
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
