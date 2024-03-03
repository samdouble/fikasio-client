import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from 'use-previous';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useGoogleLogin } from '@react-oauth/google';
import { operations } from 'services';
import { loginGoogle } from 'services/login/endpoints';
import { RootState } from 'services/store';
import links from 'utils/links';
import { getFormData } from 'utils/forms';
import { initializeSocket } from 'utils/sockets';
import './style.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const loginState = useSelector((state: RootState) => state.login);
  const history = useHistory();
  const location = useLocation();
  const [showLoginError, setShowLoginError] = useState(false);
  const prevLoginState = usePrevious(loginState);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
    operations.login.login()(dispatch)
      .catch(() => undefined);
  }, []);

  useEffect(() => {
    if (!prevLoginState && loginState) {
      initializeSocket();
      history.push(location.state ? location.state.from : links.paths.home);
    }
  }, [loginState]);

  const handleGoogleSignIn = useGoogleLogin({
    onSuccess: ({
      access_token: accessToken,
      scope,
      token_type: tokenType,
    }) => {
      loginGoogle({
        accessToken,
        scope,
        tokenType,
      });
    },
    onError: error => console.error(error),
    onNonOAuthError: error => console.error(error),
  });

  const handleLogin = () => {
    const formData: any = getFormData('Login_form');
    operations.login.login(formData.emailAddress, formData.password)(dispatch)
      .then(res => {
        if (res) {
          initializeSocket();
          history.push(location.state ? location.state.from : links.paths.home);
        }
      })
      .catch(() => {
        setShowLoginError(true);
      });

    if (document.getElementById('password')) {
      const passwordInput = document.getElementById('password') as HTMLInputElement;
      passwordInput.value = '';
    }
  };

  const handleKeyUp = e => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  return (
    <div className="Login">
      <Helmet>
        <title>{t('login')}</title>
      </Helmet>
      <h4>{t('login')}</h4>
      <Container
        fluid
        style={{
          paddingTop: 30,
        }}
      >
        <Row>
          {
            showLoginError && (
              <Alert variant="danger" >
                <strong>{t('invalidConnection')}</strong>
              </Alert>
            )
          }
        </Row>
        <Row>
          <Col md={6}>
            <form
              id="Login_form"
            >
              <Form.Group>
                <Form.Control
                  autoFocus
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
            <Button
              onClick={handleLogin}
              type="submit"
              variant="primary"
            >
              {t('login')}
            </Button>
            {t('or')}
            &nbsp;
            <a href={links.paths.signup}>
              {t('createAnAccount')}
            </a>
          </Col>
          <Col md={6}>
            <Button
              onClick={() => handleGoogleSignIn()}
              type="button"
              variant="danger"
            >
              <span className="fa fa-google" />
              &nbsp;
              {t('loginWithGoogle')}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
