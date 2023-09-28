import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import MetricsList from 'components/metrics/MetricsList';
import AddMetricButton from 'components/metrics/AddMetricButton';
import Sidebar from 'components/UI/Sidebar';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const MetricsPage = () => {
  const { t } = useTranslation();
  const metrics = useSelector((state: RootState) => state.metrics);
  const dispatch = useDispatch();

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
                <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
                <Breadcrumb.Item active>Mesures</Breadcrumb.Item>
              </Breadcrumb>
              <AddMetricButton />
              <h4>Mesures</h4>
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
      resourceFetchers={[
        () => dispatch(operations.metrics.fetchMetrics()),
      ]}
      getContents={getPage}
    />
  );
}

export default MetricsPage;
