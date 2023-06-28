import React from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { operations } from 'services';
import { getFormData } from 'utils/forms';
import 'react-datepicker/dist/react-datepicker.css';
import 'components/UI/Form.scss';

const ObjectiveStats = ({
  objective,
}) => {
  const dispatch = useDispatch();

  const onSubmit = async () => {
    const formData = getFormData('ObjectiveProgress_form');
    operations.objectives.patchObjective(objective.id, formData)(dispatch);
  };

  return (
    <Form
      onSubmit={onSubmit}
      initialValues={objective}
      mutators={{ ...arrayMutators }}
      render={({ handleSubmit }) => (
        <form
          id="ObjectiveProgress_form"
          className="formulaire"
          onSubmit={handleSubmit}
        >
          <RBForm.Group>
            <RBForm.Label>Progrès</RBForm.Label>
            <Field
              name="number:progress"
              component="input"
              className="form-control"
            />
          </RBForm.Group>
          <div style={{ position: 'absolute', right: 15, bottom: 15 }}>
            <Button variant="outline-secondary">Annuler</Button>
            <Button type="submit" variant='success'>Sauvegarder</Button>
          </div>
        </form>
      )}
    />
  );
};

export default ObjectiveStats;
