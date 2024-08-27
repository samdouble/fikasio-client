import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import SettingsAccount from 'components/settings/SettingsAccount';
import SettingsAdvanced from 'components/settings/SettingsAdvanced';
import SettingsBilling from 'components/settings/SettingsBilling';
import SettingsGeneral from 'components/settings/SettingsGeneral';
import BasePage from 'components/UI/BasePage';
import links from 'utils/links';
import './style.scss';

const SettingsPage = () => {
  const location = useLocation();
  const { t } = useTranslation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  return (
    <>
      <Helmet>
        <title>{t('settings')}</title>
      </Helmet>
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
            eventKey="ACCOUNT"
            title={t('account')}
          >
            <Row>
              <Col md={4}>
                <SettingsAccount />
              </Col>
            </Row>
          </Tab>
          <Tab
            eventKey="BILLING"
            title={t('billing')}
          >
            <Row>
              <Col md={4}>
                <SettingsBilling />
              </Col>
            </Row>
          </Tab>
          <Tab
            eventKey="ADVANCED"
            title={t('advanced')}
          >
            <Row>
              <Col md={4}>
                <SettingsAdvanced />
              </Col>
            </Row>
          </Tab>
        </Tabs>
      </BasePage>
    </>
  );
};

export default SettingsPage;
