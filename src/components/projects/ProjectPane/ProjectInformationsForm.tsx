import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import ClickOutside from 'react-click-outside';
import { CompactPicker } from 'react-color';
import { DateTime } from 'luxon';
import { DatePicker, Select } from '@fikasio/react-ui-components';
import { operations } from 'services';
import { RootState } from 'services/store';
import { invertColor } from 'utils/colors';
import 'components/UI/Form.scss';

const ProjectInformationsForm = ({
  project,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const projects = useSelector((state: RootState) => state.projects);
  const [startAt, setStartAt] = useState(
    project && project.startAt
    ? DateTime.fromISO(project.startAt).toJSDate()
    : null,
  );
  const [dueAt, setDueAt] = useState(
    project && project.dueAt
    ? DateTime.fromISO(project.dueAt).toJSDate()
    : null,
  );
  const [color, setColor] = useState(project?.color);
  const [isColorpickerOpen, setIsColorpickerOpen] = useState(false);

  const onSubmit = async values => {
    const formData = values;
    if (project) {
      operations.projects.updateProject(project.id, formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    } else {
      operations.projects.createProject(formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    }
  };

  return (
    <Form
      initialValues={project}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RBForm.Group>
            <RBForm.Label>{t('name')}</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="name"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('description')}</RBForm.Label>
            <Field
              className="form-control"
              component="textarea"
              name="description"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('parentProject')}</RBForm.Label>
            <Field
              component="select"
              className="form-control"
              name="parentProject"
              options={
                projects?.filter(p => p.id !== project?.id)
                  .map(p => ({
                    key: p.id,
                    text: p.name,
                    value: p.id,
                  }))
              }
            >
              {
                ({ input, options }) => {
                  return (
                    <Select
                      defaultValue={input.value}
                      name={input.name}
                      onChange={value => input.onChange(value)}
                      options={
                        options
                          .map(option => ({
                            label: option.text,
                            value: options.value,
                          }))
                      }
                    />
                  )
                }
              }
            </Field>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('color')}</RBForm.Label>
            <br />
            <Field
              name="color"
            >
              {
                ({ input }) => (
                  <>
                    <input
                      name="color"
                      type="hidden"
                      value={color}
                    />
                    <Button
                      onClick={() => setIsColorpickerOpen(true)}
                      style={{
                        backgroundColor: color,
                        borderColor: color,
                        color: color && invertColor(color),
                      }}
                      variant={!color ? 'link' : ''}
                    >
                      {t('select')}
                    </Button>
                    {
                      isColorpickerOpen && (
                        <ClickOutside
                          onClickOutside={() => setIsColorpickerOpen(false)}
                        >
                          <CompactPicker
                            color={color}
                            onChangeComplete={c => {
                              setColor(c.hex);
                              input.onChange(c.hex);
                              setIsColorpickerOpen(false);
                            }}
                          />
                        </ClickOutside>
                      )
                    }
                  </>
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
                      if (project?.id) {
                        operations.projects.patchProject(project.id, { startAt: timestamp.toISO() })(dispatch);
                      }
                      setStartAt(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                    }}
                  />
                )
              }
              defaultValue={startAt}
              name="startAt"
            />
          </RBForm.Group>
          <br />
          <RBForm.Group
            className="projectRow_dueAt"
          >
            <RBForm.Label>{t('deadline')}</RBForm.Label>
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    defaultValue={dueAt}
                    displayFormat="yyyy-MM-dd"
                    onChange={val => {
                      const timestamp = DateTime.fromJSDate(val)
                        .set({ hour: 23, minute: 59, second: 59, millisecond: 999 });
                      if (project && project.id) {
                        operations.projects.patchProject(project.id, { dueAt: timestamp.toISO() })(dispatch);
                      }
                      setDueAt(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
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
            <RBForm.Label>{t('members')}</RBForm.Label>
            <FieldArray name="members">
              {({ fields }) => (
                <div>
                  {
                    fields.map((name, index) => (
                      <table key={name}>
                        <tbody>
                          <tr>
                            <td>
                              <Field
                                className="form-control"
                                component="input"
                                name={`${name}.emailAddress`}
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
                    onClick={() => fields.push({ description: '' })}
                  >
                    {t('add')}
                  </Button>
                </div>
              )}
            </FieldArray>
          </RBForm.Group>
          <div
            style={{
              float: 'right',
              bottom: 10,
              paddingBottom: 15,
              position: 'absolute',
              right: 30,
            }}
          >
            {
              project
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default ProjectInformationsForm;
