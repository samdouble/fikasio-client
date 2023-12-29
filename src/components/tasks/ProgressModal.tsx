import React from 'react';
import { useDispatch } from 'react-redux';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import Modal from '../UI/Modal';
import { operations } from '../../services';
import { getFormData } from '../../utils/forms';

const ProgressModal = ({
  isOpen,
  onClose,
  task,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

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
        >
          <Form.Group>
            <Form.Label>{t('progress')}</Form.Label>
            <Form.Control type="text" name="progress" />
          </Form.Group>
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
              onClick={() => onClose()}
              variant="outline-secondary"
            >
              {t('cancel')}
            </Button>
            {
              task
              ? (
                <Button
                  onClick={() => handleUpdateTask()}
                  variant="success"
                >
                  {t('save')}
                </Button>
              ) : (
                <Button
                  onClick={() => handleCreateTask()}
                  variant="success"
                >
                  {t('create')}
                </Button>
              )
            }
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProgressModal;
