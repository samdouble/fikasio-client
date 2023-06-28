import React from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'components/UI/Modal';
import { operations } from 'services';
import { getFormData } from 'utils/forms';

const ProgressModal = ({
  isOpen,
  onClose,
  metric,
}) => {
  const dispatch = useDispatch();
  const handleUpdateProgress = async () => {
    const formData: any = getFormData('MetricProgress_form');
    operations.metrics.patchMetric(metric.id, formData)(dispatch)
      .then(() => {
        onClose();
      });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        title={ metric && metric.description }
      >
        <form
          id="MetricProgress_form"
          className="formulaire"
        >
          <Form.Group>
            <Form.Label>Progrès</Form.Label>
            <Form.Control type="text" name="number:progress" />
          </Form.Group>
          <div style={{ position: 'absolute', right: 15, bottom: 15 }}>
            <Button variant="outline-secondary" onClick={() => onClose()}>Annuler</Button>
            <Button variant='success' onClick={() => handleUpdateProgress()}>Sauvegarder</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProgressModal;
