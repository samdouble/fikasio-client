import React from 'react';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import { Select } from '@fikasio/react-ui-components';
import { useGetTemplatesQuery, useAddTemplateMutation, useUpdateTemplateMutation } from 'services/templates/api';
import { processFormData } from 'utils/forms';

interface TemplatePaneProps {
  id: string;
  onClose?: () => void;
}

const TemplatePane = ({
  id,
  onClose,
}: TemplatePaneProps) => {
  const { t } = useTranslation();
  const { data: templates } = useGetTemplatesQuery();
  const template = (templates || []).find(temp => temp.id === id);

  const [createTemplate] = useAddTemplateMutation();
  const [updateTemplate] = useUpdateTemplateMutation();

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (formData.durationUnits === 'hours') {
      formData.duration *= 60;
    }
    delete formData.durationUnits;
    if (template) {
      updateTemplate({
        id: template.id,
        ...formData,
      })
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
            <RBForm.Label>{t('name')}</RBForm.Label>
            <Field
              component="input"
              className="form-control"
              defaultValue={template && template.name}
              name="name"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('fields')}</RBForm.Label>
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
                                component={
                                  ({ input }) => {
                                    return (
                                      <Select
                                        defaultValue={input.value}
                                        name={input.name}
                                        onChange={value => input.onChange(value)}
                                        options={[
                                          { key: 'BOOLEAN', text: t('boolean'), value: 'BOOLEAN' },
                                          { key: 'NUMBER', text: t('number'), value: 'NUMBER' },
                                          { key: 'STRING', text: t('text'), value: 'STRING' },
                                        ]}
                                      />
                                    )
                                  }
                                }
                                name={`${name}.type`}
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
              bottom: 10,
              float: 'right',
              paddingBottom: 15,
              position: 'fixed',
              right: 30,
            }}
          >
            <Button
              onClick={() => { onClose && onClose(); }}
              style={{
                backgroundColor: 'white',
              }}
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
