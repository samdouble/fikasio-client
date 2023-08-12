import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { operations } from 'services';
import { processFormData } from 'utils/forms';

const TemplatePane = ({
  createTemplate,
  id,
  onClose,
  templates,
  updateTemplate,
}) => {
  const { t } = useTranslation();
  const template = (templates || []).find(temp => temp.id === id);

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (formData.durationUnits === 'hours') {
      formData.duration *= 60;
    }
    delete formData.durationUnits;
    if (template.id) {
      updateTemplate(template.id, formData)
        .then(() => {
          onClose && onClose();
        });
    } else {
      createTemplate(formData)
        .then(() => {
          onClose && onClose();
        });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={template}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <h4>{ template && template.name }</h4>
          <RBForm.Group>
            <RBForm.Label>Nom</RBForm.Label>
            <Field
              component="input"
              className="form-control"
              defaultValue={template && template.name}
              name="name"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>Champs</RBForm.Label>
            <FieldArray name="fields">
              {({ fields }) => (
                <div>
                  {
                    fields.map((name, index) => (
                      <table key={name}>
                        <tbody>
                          <tr>
                            <td>
                              <Field
                                component="input"
                                className="form-control"
                                name={`${name}.name`}
                              />
                            </td>
                            <td>
                              <Field
                                component="select"
                                className="form-control"
                                name={`${name}.type`}
                                options={[
                                  { key: 'BOOLEAN', text: 'Booléen', value: 'BOOLEAN' },
                                  { key: 'NUMBER', text: 'Nombre', value: 'NUMBER' },
                                  { key: 'STRING', text: 'Texte', value: 'STRING' },
                                ]}
                              >
                                {
                                  ({ input, options }) => {
                                    return (
                                      <select
                                        className="form-control"
                                        name={input.name}
                                        onChange={value => input.onChange(value)}
                                      >
                                        {
                                          options.map(x => {
                                            return (
                                              <option key={x.key} value={x.value}>{x.text}</option>
                                            )
                                          })
                                        }
                                      </select>
                                    )
                                  }
                                }
                              </Field>
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
                    onClick={() => fields.push({})}
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
            <Button
              onClick={() => onClose()}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            {
              template
                ? <Button type="submit" variant="success">Sauvegarder</Button>
                : <Button type="submit" variant="success">Créer</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

function mapStateToProps(state) {
  return {
    templates: state.templates,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createTemplate: operations.templates.createTemplate,
    updateTemplate: operations.templates.updateTemplate,
    patchTemplate: operations.templates.patchTemplate,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatePane);
