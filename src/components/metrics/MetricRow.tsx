import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { operations } from 'services';
import { deleteMetric } from 'services/metrics/endpoints';

const MetricRow = ({
  createMetric,
  metric,
  onEnterProgress,
  onEnterEditMetric,
}) => {
  return (
    <tr>
      <td>
        { metric.description }
      </td>
      <td
        width={35}
      >
        <FontAwesomeIcon
          icon="chart-line"
          size="1x"
          onClick={() => onEnterProgress(metric)}
          style={{ cursor: 'pointer' }}
        />
      </td>
      <td
        width={35}
      >
        <FontAwesomeIcon
          icon="copy"
          size="1x"
          onClick={() => createMetric(metric)}
          style={{ cursor: 'pointer' }}
        />
      </td>
      <td
        width={35}
      >
        <FontAwesomeIcon
          icon="edit"
          size="1x"
          onClick={() => onEnterEditMetric(metric)}
          style={{ cursor: 'pointer' }}
        />
      </td>
      <td width={35}>
        <FontAwesomeIcon
          icon="times"
          size="1x"
          onClick={() => deleteMetric(metric.id)}
          style={{
            color: '#ce0000',
            cursor: 'pointer'
          }}
        />
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
