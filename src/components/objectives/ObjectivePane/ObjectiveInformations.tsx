import React, { useState } from 'react';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { DateTime } from 'luxon';
import { DatePicker, Select } from '@fikasio/react-ui-components';
import { useAddObjectiveMutation, usePatchObjectiveMutation, useUpdateObjectiveMutation } from 'services/objectives/api';
import { useGetProjectsQuery } from 'services/projects/api';
import 'components/UI/Form.scss';

const ObjectiveInformations = ({
  objective,
}) => {
  const { t } = useTranslation();
  const { data: projects } = useGetProjectsQuery();
  const [dueDate, setDueDate] = useState(
    objective && objective.dueDate
    ? DateTime.fromISO(objective.dueDate).toJSDate()
    : null,
  );

  const [createObjective] = useAddObjectiveMutation();
  const [patchObjective] = usePatchObjectiveMutation();
  const [updateObjective] = useUpdateObjectiveMutation();

  const objectiveProjects = objective && objective.projects;

  const onSubmit = async values => {
    const formData = values;
    if (objective && objective.id) {
      updateObjective({
        id: objective.id,
        ...formData,
      });
    } else {
      createObjective(formData);
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
            <RBForm.Label>{t('name')}</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="name"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('description')}</RBForm.Label>
            <FieldArray
              className="form-control"
              component="textarea"
              name="description"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('objective')}</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="goal"
              style={{ width: 228 }}
            />
            <Field
              allowNull
              component={
                ({ input }) => (
                  <Select
                    defaultValue={input.value}
                    onChange={value => input.onChange(value)}
                    options={[
                      { label: t('daily'), value: 'DAILY' },
                      { label: t('weekly'), value: 'WEEKLY' },
                    ]}
                    style={{
                      width: 228,
                    }}
                  />
                )
              }
              name="goalFrequency"
              parse={value => (value === '' ? null : value)}
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('deadline')}</RBForm.Label>
            <br />
            <Field
              component={
                ({ input }) => (
                  <DatePicker
                    className="form-control"
                    defaultValue={dueDate}
                    displayFormat="yyyy-MM-dd"
                    onChange={date => {
                      const d = DateTime.fromJSDate(date);
                      if (objective) {
                        patchObjective({
                          id: objective.id,
                          dueDate: d,
                        });
                      }
                      setDueDate(date);
                      input.onChange(d);
                    }}
                  />
                )
              }
              defaultValue={dueDate}
              name="dueDate"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('initialProgress')}</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="initialProgress"
              style={{ width: 228 }}
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('projects')}</RBForm.Label>
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
                                component={
                                  ({ input }) => {
                                    return (
                                      <Select
                                        defaultValue={input.value}
                                        onChange={value => input.onChange(value)}
                                        options={
                                          projects?.sort(
                                            (p1, p2) => (p1.name.toLowerCase().localeCompare(p2.name.toLowerCase()))
                                          )
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
              objective
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default ObjectiveInformations;
