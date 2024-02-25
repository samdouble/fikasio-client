import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { operations } from 'services';
import { RootState } from 'services/store';
import 'components/UI/Form.scss';

interface MemberPaneProps {
  id: string;
  organizationId: string;
}

const MemberPane = ({
  id,
  organizationId,
}: MemberPaneProps) => {
  const organizations = useSelector((state: RootState) => state.organizations);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const organization = (organizations || []).find(e => e.id === organizationId);
  const member = organization?.members.find(f => f.id === id);

  const onSubmit = async values => {
    const formData = values;
    if (id !== 'NEW') {
      operations.organizations.members.updateMember(organizationId, id, formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    } else {
      operations.organizations.members.createMember(organizationId, formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    }
  };

  return (
    <Form
      initialValues={member}
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
              component="select"
              className="form-control"
              defaultValue="BOOLEAN"
              name="type"
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
                      defaultValue={input.value}
                      name={input.name}
                      onChange={value => input.onChange(value)}
                    >
                      {
                        options.map(option => {
                          return (
                            <option
                              key={option.key}
                              value={option.value}
                            >
                              {option.text}
                            </option>
                          )
                        })
                      }
                    </select>
                  )
                }
              }
            </Field>
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
              member
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default MemberPane;
