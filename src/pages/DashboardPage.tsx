import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import Card from 'components/dashboards/Card';
import Sidebar from 'components/UI/Sidebar';
import { operations } from 'services';
import { RootState } from 'services/store';
import { getTasks } from 'services/tasks/endpoints';
import { Task } from 'services/tasks/types';
import links from 'utils/links';
import './style.scss';

const DashboardPage = () => {
  const { t } = useTranslation();
  const objectives = useSelector((state: RootState) => state.objectives);
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState<Task[]>([]);
  const nbTotal = tasks.length;
  const nbDone = tasks.filter(t => t.isCompleted).length;

  useEffect(() => {
    getTasks({})
      .then(res => setTasks(res.tasks));
  }, []);

  const getPage = () => (
    <>
      <Sidebar />
      <Container
        fluid
        style={{
          paddingLeft: 100,
          paddingTop: 90,
        }}
      >
        <Row>
          <Col lg={12}>
            <Breadcrumb>
              <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
              <Breadcrumb.Item active>Tableau de bord</Breadcrumb.Item>
            </Breadcrumb>
            <h4>Tableau de bord</h4>
            <Card>
              <p>Aujourd'hui</p>
              <div style={{ fontSize: 48 }}>
                <b>2581</b> points
              </div>
            </Card>
            <Card>
              <p>Cette semaine</p>
              <div style={{ fontSize: 48 }}>
                <b>2581</b> points
              </div>
            </Card>
            <p>{ nbDone } / { nbTotal }</p>
          </Col>
        </Row>
      </Container>
    </>
  );

  return (
    <ResourcesHandler
      resources={[objectives]}
      resourceFetchers={[
        () => dispatch(operations.objectives.fetchObjectives()),
      ]}
      getContents={getPage}
    />
  );
};

export default DashboardPage;
