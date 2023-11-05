import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import MetricModal from './MetricModal';

const AddMetricButton = () => {
  const { t } = useTranslation();
  const [showModal, setShowModal] = useState(false);
  const [editedMetric, setEditedMetric] = useState(null);

  const handleOpenModal = metric => {
    setEditedMetric(metric);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditedMetric(null);
  };

  return (
    <>
      <MetricModal
        isOpen={showModal}
        metric={editedMetric}
        onClose={() => handleCloseModal()}
      />
      <Button
        variant="primary"
        style={{
          float: 'right',
          margin: 0,
        }}
        onClick={() => handleOpenModal(null)}
      >
        {t('createAMetric')}
      </Button>
    </>
  );
};

export default AddMetricButton;
