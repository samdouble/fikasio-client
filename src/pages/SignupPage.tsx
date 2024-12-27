import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Button } from '@fikasio/react-ui-components';
import { useLoginMutation, useSignupMutation } from 'services/login/api';
import links from 'utils/links';
import { getFormData } from 'utils/forms';
import { initializeSocket } from 'utils/sockets';
import './style.scss';

const SignupPage = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const [showSignupError, setShowSignupError] = useState(false);
  const navigate = useNavigate();

  const [login] = useLoginMutation();
  const [signup] = useSignupMutation();

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
    login({})
      .then(() => {
        initializeSocket();
      });
  }, []);

  const handleSignup = () => {
    const formData: any = getFormData('Signup_form');
    signup(formData)
      .then(() => {
        navigate(location.state ? location.state.from : links.paths.home);
      })
      .catch(() => {
        setShowSignupError(true);
      });

    if (document.getElementById('password')) {
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      passwordInput.value = '';
    }
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="Signup">
      <Helmet>
        <title>{t('signup')}</title>
      </Helmet>
      <h4>{t('signup')}</h4>
      <Container
        fluid
        style={{
          paddingLeft: 0,
          paddingTop: 30,
        }}
      >
        <Row>
          <Col md={12}>
            {
              showSignupError && (
                <Alert variant="danger" >
                  <strong>{t('invalidSubmission')}</strong>
                </Alert>
              )
            }
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <form
              id="Signup_form"
            >
              <Form.Group>
                <Form.Control
                  autoFocus
                  name="name"
                  placeholder={t('name')}
                  style={{ marginBottom: 10 }}
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  name="emailAddress"
                  placeholder={t('emailAddress')}
                  style={{ marginBottom: 10 }}
                  type="text"
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  id="password"
                  name="password"
                  onKeyUp={handleKeyUp}
                  placeholder={t('password')}
                  type="password"
                />
              </Form.Group>
            </form>
            <Button.Action
              onClick={handleSignup}
              type="submit"
            >
              {t('createAnAccount')}
            </Button.Action>
            &nbsp;
            {t('or')}
            &nbsp;
            <a href={links.paths.login}>
              {t('login')}
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SignupPage;
