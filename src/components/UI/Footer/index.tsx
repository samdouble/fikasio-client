import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import links from 'utils/links';
import './style.scss';

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Container
      className="footer"
      fluid
    >
      <Row>
        <Col md={12}>
          <div className="text-left">
            <a href={links.privacy()}>{t('privacy')}</a>
            <br />
            <a href={links.tos()}>{t('termsOfService')}</a>
          </div>
        </Col>
      </Row>
      <Row
        style={{
          backgroundColor: '#2e2e2e',
          paddingBottom: 25,
          paddingTop: 25,
        }}
      >
        <Col md={12}>
          <div className="text-center">
            &copy; {new Date().getFullYear()} <a href={links.tos()}>fikas.io</a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
