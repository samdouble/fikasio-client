import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import MetricModal from './MetricModal';

const AddMetricButton = () => {
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
        }}
        onClick={() => handleOpenModal(null)}
      >
        Créer une mesure
      </Button>
    </>
  );
};

export default AddMetricButton;
