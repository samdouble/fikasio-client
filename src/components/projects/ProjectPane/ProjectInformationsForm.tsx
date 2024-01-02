import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import DatePicker from 'react-datepicker';
import ClickOutside from 'react-click-outside';
import { CompactPicker } from 'react-color';
import { DateTime } from 'luxon';
import { operations } from 'services';
import { invertColor } from 'utils/colors';
import 'react-datepicker/dist/react-datepicker.css';
import 'components/UI/Form.scss';

const ProjectInformationsForm = ({
  project,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [dueDate, setDueDate] = useState(
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
                    dateFormat="yyyy-MM-dd"
                    onChange={dueAt => {
                      const timestamp = DateTime.fromJSDate(dueAt)
                        .set({ hour: 23, minute: 59, second: 59 });
                      if (project) {
                        operations.projects.patchProject(project.id, { dueAt: timestamp.toISO() })(dispatch);
                      }
                      setDueDate(timestamp.toJSDate());
                      input.onChange(timestamp.toJSDate());
                    }}
                    selected={dueDate}
                  />
                )
              }
              defaultValue={dueDate}
              name="dueAt"
            />
          </RBForm.Group>
          <br />
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
