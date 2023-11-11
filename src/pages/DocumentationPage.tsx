import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import './style.scss';

const DocumentationPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid>
      <Row>
        <Col md lg={12}>
          <h4>{t('documentation')}</h4>
        </Col>
      </Row>
    </Container>
  );
};

export default DocumentationPage;
