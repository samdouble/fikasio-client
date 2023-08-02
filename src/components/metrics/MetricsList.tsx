import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';
import { RootState } from 'services/store';
import MetricRow from './MetricRow';
import MetricModal from './MetricModal';
import ProgressModal from './ProgressModal';

const MetricsList = () => {
  const metrics = useSelector((state: RootState) => state.metrics);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showProgressModal, setShowProgressModal] = useState(false);
  const [editedMetric, setEditedMetric] = useState(null);

  const handleOpenProgressModal = metric => {
    setShowProgressModal(true);
    setEditedMetric(metric);
  };

  const handleCloseProgressModal = () => {
    setShowProgressModal(false);
    setEditedMetric(null);
  };

  const handleOpenEditModal = metric => {
    setShowEditModal(true);
    setEditedMetric(metric);
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedMetric(null);
  }

  return metrics && (
    <>
      {
        showProgressModal && <ProgressModal
          isOpen={showProgressModal}
          onClose={handleCloseProgressModal}
          metric={editedMetric}
        />
      }
      {
        showEditModal && <MetricModal
          isOpen={showEditModal}
          onClose={handleCloseEditModal}
          metric={editedMetric}
        />
      }
      <Table
        responsive
        bordered
        hover
      >
        <thead>
          <tr>
            <th>Description</th>
            <th colSpan={4} />
          </tr>
        </thead>
        <tbody>
          {
            metrics
              .sort((m1, m2) => (m1.dueDate < m2.dueDate ? -1 : 1))
              .map(metric => (
                <MetricRow
                  key={metric.id}
                  metric={metric}
                  onEnterProgress={handleOpenProgressModal}
                  onEnterEditMetric={handleOpenEditModal}
                />
              ))
          }
        </tbody>
      </Table>
    </>
  );
}

export default MetricsList;
