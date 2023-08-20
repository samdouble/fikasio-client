import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { operations } from 'services';
import { RootState } from 'services/store';
import { processFormData } from 'utils/forms';

interface TemplatePaneProps {
  id: string;
  onClose?: () => void;
}

const TemplatePane = ({
  id,
  onClose,
}: TemplatePaneProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const templates = useSelector((state: RootState) => state.templates);
  const template = (templates || []).find(temp => temp.id === id);

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (formData.durationUnits === 'hours') {
      formData.duration *= 60;
    }
    delete formData.durationUnits;
    if (template) {
      operations.templates.updateTemplate(template.id, formData)(dispatch)
        .then(() => {
          onClose && onClose();
        });
    } else {
      operations.templates.createTemplate(formData)(dispatch)
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
            <Button
              onClick={() => { onClose && onClose(); }}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            {
              template
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default TemplatePane;
