import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import links from 'utils/links';
import './style.scss';

const Footer = () => {
  return (
    <Container
      className='footer'
      fluid
    >
      <Row>
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
