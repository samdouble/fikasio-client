import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';

const PrivacyPage = () => {
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
        <title>{t('privacy')}</title>
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
              <h1>Privacy Policy</h1>
              <p>Last Updated: 2024-02-02</p>

              <h2>Introduction</h2>
              <p>Welcome to fikas.io ("us," "we," or "our"). We are committed to protecting your privacy
                and providing a secure environment for our users. This Privacy Policy outlines how we
                collect, use, and safeguard your personal information.</p>

              <h2>Information We Collect</h2>
              <h3>1. Personal Information</h3>
              <p>When you sign up for [Your SaaS Platform], we may collect personal information such as
                your name, email address, billing information, and other details necessary for account
                setup and payment processing through Stripe.</p>
              <h3>2. Payment Information</h3>
              <p>We use Stripe, a third-party payment processor, to securely handle your payment information.
                We do not store or process any payment-related data on our servers.
                Please review Stripe's Privacy Policy for details on how they handle your payment information.
              </p>
              <h3>3. Usage Data</h3>
              <p>We utilize Google Analytics to analyze website traffic and user behavior.
                Google Analytics collects anonymous information such as IP addresses, browser types, and
                pages visited. This data helps us improve our services and enhance the user experience.
                For more information, please refer to Google's Privacy & Terms.
              </p>

              <h2>How We Use Your Information</h2>
              <p>
                <b>Service Provision:</b> To provide, maintain, and improve our services.
                <b>Communication:</b> To communicate with you regarding your account, updates, and support.
                <b>Analytics:</b> To analyze and understand how users interact with our platform.
              </p>

              <h2>Data Security</h2>
              <p>We take the security of your personal information seriously and employ industry-standard
                measures to protect it. However, no method of transmission over the internet or electronic
                storage is entirely secure; therefore, we cannot guarantee absolute security.
              </p>

              {
                /*
                <h2>Your Choices</h2>
                <p>You have the right to access, correct, or delete your personal information.
                You can manage your preferences within your account settings.
                If you have any questions or requests, please contact us at [contact@email.com].</p>
                */
              }

              <h2>Changes to this Privacy Policy</h2>
              <p>We reserve the right to update or modify this Privacy Policy at any time.
                Changes will be effective immediately upon posting on our website.
                Please check this page periodically for updates.
              </p>
              
              {
                /*
                <h2>Contact Us</h2>
                <p>If you have any questions or concerns about our Privacy Policy, please contact us
                at [contact@email.com].
                </p>
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

export default PrivacyPage;
