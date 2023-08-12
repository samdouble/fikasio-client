import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropdown from 'react-bootstrap/Dropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DropdownToggle from 'components/UI/DropdownToggle';
import { operations } from 'services';
import { deleteMetric } from 'services/metrics/endpoints';

const MetricRow = ({
  createMetric,
  metric,
  onEnterProgress,
  onEnterEditMetric,
}) => {
  const { t } = useTranslation();

  return (
    <tr>
      <td>
        { metric.description }
      </td>
      <td
        style={{
          textAlign: 'center',
        }}
        width={35}
      >
        <Dropdown
          style={{
            position: 'static',
          }}
        >
          <Dropdown.Toggle as={DropdownToggle} />
          <Dropdown.Menu>
            <Dropdown.Item
              onClick={() => onEnterProgress(metric)}
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
              onClick={() => createMetric(metric)}
            >
              <FontAwesomeIcon
                icon="copy"
                style={{
                  marginRight: 10,
                  width: 25,
                }}
              />
              {t('copy')}
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => onEnterEditMetric(metric)}
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
              onClick={() => deleteMetric(metric.id)}
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
      </td>
    </tr>
  );
};

function mapStateToProps(state) {
  return {
    metrics: state.metrics,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    createMetric: operations.metrics.createMetric,
    patchMetric: operations.metrics.patchMetric,
    deleteMetric: operations.metrics.deleteMetric,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricRow);
