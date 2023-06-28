import React from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from '../UI/Modal';
import { operations } from '../../services';
import { getFormData } from '../../utils/forms';

const ProgressModal = ({
  isOpen,
  onClose,
  task,
}) => {
  const dispatch = useDispatch();

  const handleCreateTask = async () => {
    const formData: any = getFormData('TaskProgress_form');
    operations.tasks.createTask(formData)(dispatch)
      .then(() => {
        onClose();
      });
  };

  const handleUpdateTask = async () => {
    const formData: any = getFormData('TaskProgress_form');
    operations.tasks.updateTask(task.id, formData)(dispatch)
      .then(() => {
        onClose();
      });
  };

  return (
    <div>
      <Modal
        isOpen={isOpen}
        onClose={() => onClose()}
        title={ task && task.description }
      >
        <form
          id="TaskProgress_form"
          className="formulaire"
        >
          <Form.Group>
            <Form.Label>Progrès</Form.Label>
            <Form.Control type="text" name="progress" />
          </Form.Group>
          <div
            style={{
              float: 'right',
              bottom: 10,
              paddingBottom: 15,
              position: 'absolute',
              right: 30,
            }}
          >
            <Button variant="outline-secondary" onClick={() => onClose()}>Annuler</Button>
            {
              task
              ? <Button variant="success" onClick={() => handleUpdateTask()}>Sauvegarder</Button>
              : <Button variant="success" onClick={() => handleCreateTask()}>Créer</Button>
            }
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProgressModal;
