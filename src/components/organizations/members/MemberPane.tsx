import React from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { Select } from '@fikasio/react-ui-components';
import {
  useGetOrganizationsQuery,
  useAddMemberToOrganizationMutation,
  useUpdateMemberInOrganizationMutation,
} from 'services/organizations/api';
import { clearPaneContent } from 'services/pane/slice';
import 'components/UI/Form.scss';

interface MemberPaneProps {
  id: string;
  organizationId: string;
}

const MemberPane = ({
  id,
  organizationId,
}: MemberPaneProps) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: organizations } = useGetOrganizationsQuery();

  const [createMember] = useAddMemberToOrganizationMutation();
  const [updateMember] = useUpdateMemberInOrganizationMutation();

  const organization = (organizations || []).find(e => e.id === organizationId);
  const member = organization?.members.find(f => f.id === id);

  const onSubmit = async values => {
    const formData = values;
    if (id !== 'NEW') {
      updateMember({
        organizationId,
        id,
        ...formData,
      })
        .then(() => dispatch(clearPaneContent()));
    } else {
      createMember({
        organizationId,
        ...formData,
      })
        .then(() => dispatch(clearPaneContent()));
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
              component={
                ({ input }) => {
                  return (
                    <Select
                      defaultValue={input.value}
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
