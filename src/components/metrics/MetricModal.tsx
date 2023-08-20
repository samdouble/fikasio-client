import React from 'react';
import { useDispatch } from 'react-redux';
import RBForm from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { Form, Field } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { operations } from 'services';
import Modal from '../UI/Modal';
import 'react-datepicker/dist/react-datepicker.css';
import '../UI/Form.scss';

const MetricModal = ({
  isOpen,
  metric,
  onClose,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const onSubmit = async values => {
    const formData = values;
    if (metric) {
      operations.metrics.updateMetric(metric.id, formData)(dispatch);
    } else {
      operations.metrics.createMetric(formData)(dispatch)
        .then(() => dispatch(operations.pane.clearPaneContent()));
    }
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        title={ metric ? 'Modifier une mesure' : 'Créer une mesure' }
      >
        <Form
          onSubmit={onSubmit}
          mutators={{ ...arrayMutators }}
          render={({ handleSubmit }) => (
            <form onSubmit={handleSubmit}>
              <h4>{ metric && metric.name }</h4>
              <RBForm.Group>
                <RBForm.Label>Description</RBForm.Label>
                <Field
                  className="form-control"
                  component="input"
                  defaultValue={metric && metric.description}
                  name="description"
                />
              </RBForm.Group>
              <div
                style={{
                  bottom: 0,
                  float: 'right',
                  paddingBottom: 15,
                }}
              >
                <Button
                  variant="outline-secondary"
                  onClick={() => dispatch(operations.pane.clearPaneContent())}
                >
                  {t('cancel')}
                </Button>
                {
                  metric
                    ? <Button type="submit" variant="success">{t('save')}</Button>
                    : <Button type="submit" variant="success">{t('create')}</Button>
                }
              </div>
            </form>
          )}
        />
      </Modal>
    </div>
  );
};

export default MetricModal;
