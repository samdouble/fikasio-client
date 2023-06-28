import React, { useState } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import DatePicker from 'react-datepicker';
import { DateTime } from 'luxon';
import { operations } from 'services';
import 'react-datepicker/dist/react-datepicker.css';
import 'components/UI/Form.scss';

const ObjectiveInformations = ({
  createObjective,
  updateObjective,
  patchObjective,
  objective,
  projects,
}) => {
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
      updateObjective(objective.id, formData);
    } else {
      createObjective(formData);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={objective}
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
            <RBForm.Label>Objectif</RBForm.Label>
            <Field
              name="goal"
              component="input"
              className="form-control"
              style={{ width: 228 }}
            />
            <Field
              name="goalFrequency"
              component="select"
              className="form-control"
              style={{ width: 228 }}
              allowNull
              parse={value => (value === '' ? null : value)}
            >
              <option />
              <option value='DAILY'>Quotidiennement</option>
              <option value='WEEKLY'>Hebdomadairement</option>
            </Field>
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Échéance</RBForm.Label>
            <br />
            <Field
              name="dueDate"
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    onChange={date => {
                      const d = DateTime.fromJSDate(date).toFormat('yyyy-MM-dd');
                      if (objective) {
                        patchObjective(objective.id, { dueDate: d });
                      }
                      setDueDate(date);
                      input.onChange(d);
                    }}
                    selected={dueDate || dateDueDate}
                  />
                )
              }
              defaultValue={DateTime.fromJSDate(dueDate || dateDueDate).toFormat('yyyy-MM-dd')}
            />
          </RBForm.Group>
          <br />
          <br />
          <RBForm.Group>
            <RBForm.Label>Progrès initial</RBForm.Label>
            <Field
              name="initialProgress"
              component="input"
              className="form-control"
              style={{ width: 228 }}
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Projets</RBForm.Label>
            <FieldArray
              name="projects"
              defaultValue={objectiveProjects}
              className="form-control"
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
                                name={`${name}.id`}
                                component="select"
                                className="form-control"
                              >
                                <option />
                                {
                                  projects
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
                            <td rowSpan={2} width={35}>
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
                ? <Button type="submit" variant='success'>Sauvegarder</Button>
                : <Button type="submit" variant='success'>Créer</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createObjective: operations.objectives.createObjective,
    updateObjective: operations.objectives.updateObjective,
    patchObjective: operations.objectives.patchObjective,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(ObjectiveInformations);
