import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useTranslation } from 'react-i18next';
import SettingsGeneral from 'components/settings/SettingsGeneral';
import SettingsPayments from 'components/settings/SettingsPayments';
import Sidebar from 'components/UI/Sidebar';
import './style.scss';

const SettingsPage = () => {
  const { t } = useTranslation();

  return (
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
            <h4>{t('settings')}</h4>
            <Tabs
              className="mb-3"
              defaultActiveKey="GENERAL"
            >
              <Tab
                eventKey="GENERAL"
                title={t('general')}
              >
                <Row>
                  <Col md={4}>
                    <SettingsGeneral />
                  </Col>
                </Row>
              </Tab>
              <Tab
                eventKey="PAYMENTS"
                title={t('payments')}
              >
                <Row>
                  <Col md={4}>
                    <SettingsPayments />
                  </Col>
                </Row>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default SettingsPage;
