import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import DatePicker from 'react-datepicker';
import { DateTime } from 'luxon';
import { operations } from 'services';
import { RootState } from 'services/store';
import 'react-datepicker/dist/react-datepicker.css';
import 'components/UI/Form.scss';

const ObjectiveInformations = ({
  objective,
}) => {
  const dispatch = useDispatch();
  const projects = useSelector((state: RootState) => state.projects);
  const splitDueDate = objective && objective.dueDate && objective.dueDate.split('-');
  const dateDueDate = splitDueDate
    ? new Date(
      parseInt(splitDueDate[0], 10),
      parseInt(splitDueDate[1], 10) - 1,
      parseInt(splitDueDate[2], 10))
    : new Date();
  const [dueDate, setDueDate] = useState(null);

  const objectiveProjects = objective && objective.projects;

  const onSubmit = async values => {
    const formData = values;
    if (objective.id) {
      operations.objectives.updateObjective(objective.id, formData)(dispatch);
    } else {
      operations.objectives.createObjective(formData)(dispatch);
    }
  };

  return (
    <Form
      initialValues={objective}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RBForm.Group>
            <RBForm.Label>Nom</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="name"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Description</RBForm.Label>
            <FieldArray
              className="form-control"
              component="textarea"
              name="description"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Objectif</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="goal"
              style={{ width: 228 }}
            />
            <Field
              allowNull
              className="form-control"
              component="select"
              name="goalFrequency"
              parse={value => (value === '' ? null : value)}
              style={{ width: 228 }}
            >
              <option />
              <option value="DAILY">Quotidiennement</option>
              <option value="WEEKLY">Hebdomadairement</option>
            </Field>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Échéance</RBForm.Label>
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    onChange={date => {
                      const d = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
                      if (objective) {
                        operations.objectives.patchObjective(objective.id, { dueDate: d })(dispatch);
                      }
                      setDueDate(date);
                      input.onChange(d);
                    }}
                    selected={dueDate || dateDueDate}
                  />
                )
              }
              defaultValue={DateTime.fromJSDate(dueDate || dateDueDate).toFormat('yyyy-MM-dd')}
              name="dueDate"
            />
          </RBForm.Group>
          <br />
          <br />
          <RBForm.Group>
            <RBForm.Label>Progrès initial</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="initialProgress"
              style={{ width: 228 }}
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Projets</RBForm.Label>
            <FieldArray
              className="form-control"
              defaultValue={objectiveProjects}
              name="projects"
            >
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
                                component="select"
                                name={`${name}.id`}
                              >
                                <option />
                                {
                                  projects?.sort(
                                    (p1, p2) => (p1.name.toLowerCase().localeCompare(p2.name.toLowerCase()))
                                  )
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
                            <td rowSpan={2} width={35}>
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
              objective
                ? <Button type="submit" variant="success">Sauvegarder</Button>
                : <Button type="submit" variant="success">Créer</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default ObjectiveInformations;
