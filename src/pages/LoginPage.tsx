import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLoginMutation } from 'services/login/api';
import { useAuth } from 'services/login/hooks';
import { setCredentials } from 'services/login/slice';
import links from 'utils/links';
import { getFormData } from 'utils/forms';
import { initializeSocket } from 'utils/sockets';
import { setLanguage } from 'utils/translation';
import './style.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [login] = useLoginMutation();
  const [showLoginError, setShowLoginError] = useState(false);

  useEffect(() => {
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
  }, []);

  useEffect(() => {
    if (auth.user) {
      setLanguage(auth.user.language);
      initializeSocket();
      navigate(location.state ? location.state.from : links.paths.home);
    }
  }, [auth]);

  // const handleGoogleSignIn = useGoogleLogin({
  //   onSuccess: ({
  //     access_token: accessToken,
  //     scope,
  //     token_type: tokenType,
  //   }) => {
  //     // loginGoogle({
  //     //   accessToken,
  //     //   scope,
  //     //   tokenType,
  //     // });
  //   },
  //   onError: error => console.error(error),
  //   onNonOAuthError: error => console.error(error),
  // });

  const handleLogin = async () => {
    const formData: any = getFormData('Login_form');
    login({
      emailAddress: formData.emailAddress,
      password: formData.password,
    })
      .then(({ data: user }) => {
        if (!user) {
          throw new Error('Login failed');
        }
        dispatch(setCredentials({ user }));
        initializeSocket();
        navigate(location.state ? location.state.from : links.paths.home);
      })
      .catch(() => setShowLoginError(true));

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
          paddingLeft: 0,
          paddingTop: 30,
        }}
      >
        <Row>
          <Col md={12}>
            {
              showLoginError && (
                <Alert variant="danger" >
                  <strong>{t('invalidConnection')}</strong>
                </Alert>
              )
            }
          </Col>
        </Row>
        <Row>
          <Col md={12}>
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
            {
              /*
              <Button
                onClick={() => handleGoogleSignIn()}
                type="button"
                variant="danger"
              >
                <span className="fa fa-google" />
                &nbsp;
                {t('loginWithGoogle')}
              </Button>
              */
            }
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default LoginPage;
