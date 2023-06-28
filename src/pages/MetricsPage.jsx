import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ResourcesHandler from 'components/ResourcesHandler';
import MetricsList from 'components/metrics/MetricsList';
import AddMetricButton from 'components/metrics/AddMetricButton';
import Sidebar from 'components/UI/Sidebar';
import { operations } from 'services';
import links from 'utils/links';
import './style.scss';

const MetricsPage = ({
  metrics,
  fetchMetrics,
}) => {
  const getPage = () => {
    return (
      <>
        <Sidebar />
        <Container fluid style={{
          paddingLeft: 100,
          paddingTop: 90,
        }}>
          <Row>
            <Col lg={12}>
              <Breadcrumb>
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>Accueil</Breadcrumb.Item>
                <Breadcrumb.Item active>Mesures</Breadcrumb.Item>
              </Breadcrumb>
              <h4>Mesures</h4>
              <AddMetricButton />
              <br />
              <br />
              <MetricsList />
            </Col>
          </Row>
        </Container>
      </>
    );
  };

  return (
    <ResourcesHandler
      resources={[metrics]}
      resourceFetchers={[fetchMetrics]}
      getContents={getPage}
    />
  );
}

function mapStateToProps(state) {
  return {
    metrics: state.metrics,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    fetchMetrics: operations.metrics.fetchMetrics,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MetricsPage);
