import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import Card from 'components/dashboards/Card';
import Sidebar from 'components/UI/Sidebar';
import { useGetTasksQuery } from 'services/tasks/api';
import links from 'utils/links';
import './style.scss';

const DashboardPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { data: tasks } = useGetTasksQuery({});
  const nbTotal = tasks?.length;
  const nbDone = tasks?.filter(task => task.status === 'Completed').length;

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('dashboard')}</title>
      </Helmet>
      <Sidebar />
      <Container
        fluid
        style={{
          paddingLeft: 100,
          paddingRight: 30,
          paddingTop: 90,
        }}
      >
        <Row>
          <Col lg={12}>
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
              <Breadcrumb.Item active>{t('dashboard')}</Breadcrumb.Item>
            </Breadcrumb>
            <h4>{t('dashboard')}</h4>
            <Card>
              <p>{t('today')}</p>
              <div style={{ fontSize: 48 }}>
                <b>2581</b>
                {t('points')}
              </div>
            </Card>
            <Card>
              <p>{t('thisWeek')}</p>
              <div style={{ fontSize: 48 }}>
                <b>2581</b>
                {t('points')}
              </div>
            </Card>
            <p>{ nbDone } / { nbTotal }</p>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DashboardPage;
