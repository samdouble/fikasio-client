import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { useTranslation } from 'react-i18next';
import ResourcesHandler from 'components/ResourcesHandler';
import SettingsGeneral from 'components/settings/SettingsGeneral';
import SettingsPayments from 'components/settings/SettingsPayments';
import BasePage from 'components/UI/BasePage';
import { operations } from 'services';
import { RootState } from 'services/store';
import links from 'utils/links';
import './style.scss';

const SettingsPage = () => {
  const { t } = useTranslation();
  const cards = useSelector((state: RootState) => state.cards);
  const dispatch = useDispatch();

  const getPage = () => (
    <BasePage>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: links.paths.home }}>{t('home')}</Breadcrumb.Item>
        <Breadcrumb.Item active>{t('settings')}</Breadcrumb.Item>
      </Breadcrumb>
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
    </BasePage>
  );

  return (
    <ResourcesHandler
      getContents={getPage}
      resourceFetchers={[
        () => dispatch(operations.cards.fetchCards()),
      ]}
      resources={[cards]}
    />
  );
};

export default SettingsPage;
