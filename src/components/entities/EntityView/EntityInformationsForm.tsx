import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { useAddEntityMutation, useUpdateEntityMutation } from 'services/entities/api';
import { clearPaneContent } from 'services/pane/slice';
import { processFormData } from 'utils/forms';
import links from 'utils/links';

const EntityInformationsForm = ({
  entity,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [createEntity] = useAddEntityMutation();
  const [updateEntity] = useUpdateEntityMutation();

  const onSubmit = async values => {
    const formData: any = processFormData(values);
    if (entity) {
      updateEntity({
        id: entity.id,
        ...formData,
      });
    } else {
      createEntity(formData)
        .then(() => {
          dispatch(clearPaneContent());
          navigate(links.paths.entities);
        });
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={entity}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form
          onSubmit={handleSubmit}
        >
          <RBForm.Group>
            <RBForm.Label>{t('name')}</RBForm.Label>
            <Field
              name="name"
              component="input"
              className="form-control"
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
              onClick={() => navigate(links.paths.entities)}
              style={{
                backgroundColor: 'white',
              }}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            {
              entity
                ? <Button type="submit" variant="success">{t('save')}</Button>
                : <Button type="submit" variant="success">{t('create')}</Button>
            }
          </div>
        </form>
      )}
    />
  );
};

export default EntityInformationsForm;
