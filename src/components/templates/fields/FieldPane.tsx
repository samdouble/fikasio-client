import React from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Select } from '@fikasio/react-ui-components';
import { clearPaneContent } from 'services/pane/slice';
import { useGetTemplatesQuery, useAddFieldToTemplateMutation, useUpdateFieldInTemplateMutation } from 'services/templates/api';
import 'components/UI/Form.scss';

interface FieldPaneProps {
  id: string;
  templateId: string;
}

const FieldPane = ({
  id,
  templateId,
}: FieldPaneProps) => {
  const { data: templates } = useGetTemplatesQuery();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const template = (templates || []).find(e => e.id === templateId);
  const field = template?.fields.find(f => f.id === id);

  const [createTemplateField] = useAddFieldToTemplateMutation();
  const [updateTemplateField] = useUpdateFieldInTemplateMutation();

  const onSubmit = async values => {
    const formData = values;
    if (id !== 'NEW') {
      updateTemplateField({
        templateId,
        id,
        ...formData,
      })
        .then(() => dispatch(clearPaneContent()));
    } else {
      createTemplateField({
        templateId,
        ...formData,
      })
        .then(() => dispatch(clearPaneContent()));
    }
  };

  return (
    <Form
      initialValues={field}
      mutators={{ ...arrayMutators }}
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form onSubmit={handleSubmit}>
          <RBForm.Group>
            <RBForm.Label>{t('name')}</RBForm.Label>
            <Field
              component="input"
              className="form-control"
              name="name"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('type')}</RBForm.Label>
            <Field
              component={
                ({ input }) => (
                  <Select
                    defaultValue={input.value}
                    onChange={value => input.onChange(value)}
                    options={[
                      { label: t('boolean'), value: 'BOOLEAN' },
                      { label: t('number'), value: 'NUMBER' },
                      { label: t('text'), value: 'STRING' },
                    ]}
                  />
                )
              }
              name="type"
            />
          </RBForm.Group>
          <RBForm.Group>
            <RBForm.Label>{t('required')}</RBForm.Label>
            <Field
              component="input"
              className="form-control"
              name="isRequired"
              type="checkbox"
            >
              {
                props => (
                  <div>
                    <RBForm.Check
                      {...props.input}
                      type="switch"
                    />
                  </div>
                )
              }
            </Field>
          </RBForm.Group>
          <div style={{ float: 'right', bottom: 0, paddingBottom: 15 }}>
            {
              field
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default FieldPane;
