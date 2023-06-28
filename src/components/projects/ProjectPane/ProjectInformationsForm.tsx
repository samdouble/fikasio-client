import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
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
  const [dueDate, setDueDate] = useState(
    project && project.dueAt
    ? DateTime.fromISO(project.dueAt).toJSDate()
    : null,
  );
  const [color, setColor] = useState(project?.color);
  const [isColorpickerOpen, setIsColorpickerOpen] = useState(false);

  const onSubmit = async values => {
    const formData = values;
    if (project.id) {
      operations.projects.updateProject(project.id, formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    } else {
      operations.projects.createProject(formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={project}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RBForm.Group>
            <RBForm.Label>Nom</RBForm.Label>
            <Field
              name="name"
              component="input"
              className="form-control"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Description</RBForm.Label>
            <Field
              name="description"
              component="textarea"
              className="form-control"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Couleur</RBForm.Label>
            <br />
            <Field
              name="color"
            >
              {
                ({ input }) => (
                  <>
                    <input
                      type="hidden"
                      name="color"
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
                      Sélectionner
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
            <RBForm.Label>Échéance</RBForm.Label>
            <br />
            <Field
              name="dueAt"
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
            />
          </RBForm.Group>
          <br />
          <br />
          <RBForm.Group>
            <RBForm.Label>Membres</RBForm.Label>
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
                                size="1x"
                                onClick={() => fields.remove(index)}
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
                    Ajouter
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
                ? <Button type="submit" variant='success'>Sauvegarder</Button>
                : <Button type="submit" variant='success'>Créer</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default ProjectInformationsForm;
