import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { deleteMetric } from 'services/metrics/endpoints';
import Table from 'components/UI/Table/Table';
import { RootState } from 'services/store';
import MetricModal from './MetricModal';
import ProgressModal from './ProgressModal';

const MetricsList = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
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

  return (
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
        columns={[
          {
            name: 'Description',
            property: 'description',
            type: 'cell',
          }, {
            type: 'options',
          }
        ]}
        options={row => (
          <Dropdown
            style={{
              position: 'static',
            }}
          >
            <Dropdown.Toggle as={DropdownToggle} />
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={() => handleOpenProgressModal(row)}
              >
                <FontAwesomeIcon
                  icon="chart-line"
                  style={{
                    marginRight: 10,
                    width: 25,
                  }}
                />
                Entrer un progrès
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => operations.metrics.createMetric(row)(dispatch)}
              >
                <FontAwesomeIcon
                  icon="copy"
                  style={{
                    marginRight: 10,
                    width: 25,
                  }}
                />
                {t('duplicate')}
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => handleOpenEditModal(row)}
              >
                <FontAwesomeIcon
                  icon="edit"
                  style={{
                    marginRight: 10,
                    width: 25,
                  }}
                />
                Modifier
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() => deleteMetric(row.id)}
              >
                <FontAwesomeIcon
                  icon="times"
                  style={{
                    color: 'red',
                    marginRight: 10,
                    width: 25,
                  }}
                />
                {t('delete')}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}
        rows={metrics?.sort((m1, m2) => (m1.dueDate < m2.dueDate ? -1 : 1))}
      />
    </>
  );
}

export default MetricsList;
