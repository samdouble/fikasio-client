import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useAddOrganizationMutation, useUpdateOrganizationMutation } from 'services/organizations/api';
import { clearPaneContent } from 'services/pane/slice';
import { processFormData } from 'utils/forms';
import links from 'utils/links';

const OrganizationInformationsForm = ({
  organization,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [createOrganization] = useAddOrganizationMutation();
  const [updateOrganization] = useUpdateOrganizationMutation();

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (organization) {
      updateOrganization({
        id: organization.id,
        ...formData,
      });
    } else {
      createOrganization(formData)
        .then(() => {
          dispatch(clearPaneContent());
          navigate(links.paths.organizations);
        });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={organization}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
        >
          <RBForm.Group>
            <RBForm.Label>{t('name')}</RBForm.Label>
            <Field
              className="form-control"
              component="input"
              name="name"
            />
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
              onClick={() => dispatch(clearPaneContent())}
              style={{
                backgroundColor: 'white',
              }}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            {
              organization
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default OrganizationInformationsForm;
