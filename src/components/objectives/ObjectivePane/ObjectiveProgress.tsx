import React from 'react';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { usePatchObjectiveMutation } from 'services/objectives/api';
import { getFormData } from 'utils/forms';
import 'components/UI/Form.scss';

const ObjectiveStats = ({
  objective,
}) => {
  const { t } = useTranslation();

  const [patchObjective] = usePatchObjectiveMutation();

  const onSubmit = async () => {
    const formData = getFormData('ObjectiveProgress_form');
    patchObjective({
      id: objective.id,
      ...formData,
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={objective}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form
          id="ObjectiveProgress_form"
          onSubmit={handleSubmit}
        >
          <RBForm.Group>
            <RBForm.Label>{t('progress')}</RBForm.Label>
            <Field
              name="number:progress"
              component="input"
              className="form-control"
            />
          </RBForm.Group>
          <div style={{ position: 'absolute', right: 15, bottom: 15 }}>
            <Button
              style={{
                backgroundColor: 'white',
              }}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              variant="success"
            >
              {t('save')}
            </Button>
          </div>
        </form>
      )}
    />
  );
};

export default ObjectiveStats;
