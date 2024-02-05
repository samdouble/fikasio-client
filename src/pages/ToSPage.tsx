import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const ToSPage = () => {
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
        <title>{t('termsOfService ')}</title>
      </Helmet>
      <Container
        fluid
        style={{
          paddingLeft: 100,
          paddingTop: 90,
        }}
      >
        <Row>
          <Col lg={12}>
            <div>
              <h1>Terms of Service</h1>
              <p>Last Updated: 2024-02-02</p>

              <h2>1. Acceptance of Terms</h2>
              <p>Welcome to fikas.io ("us," "we," or "our").
                By accessing or using our services, you agree to comply with and be bound by these
                Terms of Service.
                If you do not agree with these terms, please do not use our services.</p>

              <h2>2. Use of Services</h2>
              <h3>2.1 Account Creation</h3>
              <p>To use our services, you must create an account.
                You are responsible for maintaining the confidentiality of your account information
                and are fully responsible for all activities that occur under your account.</p>
              <h3>2.2 Payment Processing</h3>
              <p>We use Stripe, a third-party payment processor, to handle payments.
                By using our services, you agree to abide by
                <a
                  href="https://stripe.com/terms"
                  target="_blank"
                  rel="noreferrer"
                >
                  Stripe's Terms of Service
                </a>. 
                We do not store or process any payment-related data on our servers.</p>

              <h2>3. User Conduct</h2>
              <p>You agree not to:</p>
              <ul>
                <li>Violate any laws or regulations.</li>
                <li>Infringe upon the rights of others.</li>
                <li>Use our services for any unlawful or malicious purpose.</li>
                <li>Interfere with the proper functioning of our services.</li>
              </ul>

              <h2>4. Privacy</h2>
              <p>Our <a href="#privacy-policy">Privacy Policy</a> outlines how we collect, use, and protect your personal information.
              By using our services, you consent to the practices described in the Privacy Policy.</p>

              <h2>5. Intellectual Property</h2>
              <p>All content and materials available on our platform, including but not limited to
                text, graphics, logos, and software, are the property of fikas.io and are protected by
                intellectual property laws.</p>

              <h2>6. Termination</h2>
              <p>We reserve the right to terminate or suspend your account at our discretion, without
                notice, for any violation of these Terms of Service or for any other reason.</p>

              <h2>7. Limitation of Liability</h2>
              <p>We are not liable for any indirect, incidental, special, or consequential damages arising
                out of or in any way connected with the use of our services.</p>

              <h2>8. Changes to Terms</h2>
              <p>We reserve the right to update or modify these Terms of Service at any time.
                Changes will be effective immediately upon posting on our website. Please review these terms
                regularly.</p>

              <h2>9. Governing Law</h2>
              <p>These Terms of Service are governed by and construed in accordance with the laws of Canada.</p>

              {
                /*
                <h2>10. Contact Us</h2>
                <p>If you have any questions or concerns about our Terms of Service, please contact us
                at <a href="mailto:contact@email.com">contact@email.com</a>.</p>
                */
              }
              <p>Thank you for choosing fikas.io.</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ToSPage;
