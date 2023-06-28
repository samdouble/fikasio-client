import React from 'react';
import { connect } from 'react-redux';
import Table from 'react-bootstrap/Table';
import MetricRow from './MetricRow';
import MetricModal from './MetricModal';
import ProgressModal from './ProgressModal';

class MetricsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      showProgressModal: false,
      editedMetric: null,
    };
  }

  handleOpenProgressModal = metric => {
    this.setState({
      showProgressModal: true,
      editedMetric: metric,
    })
  }

  handleCloseProgressModal = () => {
    this.setState({
      showProgressModal: false,
      editedMetric: null,
    })
  }

  handleOpenEditModal = metric => {
    this.setState({
      showEditModal: true,
      editedMetric: metric,
    });
  }

  handleCloseEditModal = () => {
    this.setState({
      showEditModal: false,
      editedMetric: null,
    });
  }

  render() {
    const {
      showProgressModal,
      showEditModal,
      editedMetric,
    } = this.state;
    const { metrics } = this.props;
    return metrics && (
      <>
        {
          showProgressModal && <ProgressModal
            isOpen={showProgressModal}
            onClose={this.handleCloseProgressModal}
            metric={editedMetric}
          />
        }
        {
          showEditModal && <MetricModal
            isOpen={showEditModal}
            onClose={this.handleCloseEditModal}
            metric={editedMetric}
          />
        }
        <Table responsive bordered hover>
          <thead>
            <tr>
              <th>Description</th>
              <th colSpan={4} />
            </tr>
          </thead>
          <tbody>
            {
              metrics
                .sort((o1, o2) => (o1.dueDate < o2.dueDate ? -1 : 1))
                .map(metric => (
                  <MetricRow
                    key={metric.id}
                    metric={metric}
                    onEnterProgress={this.handleOpenProgressModal}
                    onEnterEditMetric={this.handleOpenEditModal}
                    onExitEditMetric={this.handleCloseEditModal}
                  />
                ))
            }
          </tbody>
        </Table>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    metrics: state.metrics,
  };
}

export default connect(mapStateToProps)(MetricsList);
