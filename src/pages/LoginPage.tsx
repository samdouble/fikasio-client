import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from 'use-previous';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import ReactGA from 'react-ga4';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { operations } from 'services';
import { googleSignIn } from 'services/login/endpoints';
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

  const handleGoogleSignIn = () => googleSignIn();

  return (
    <div className="Login">
      <Helmet>
        <title>{t('login')}</title>
      </Helmet>
      <h4>{t('login')}</h4>
      <Table
        className="LoginPage_table"
      >
        <tbody>
          <tr>
            <td>
              {
                showLoginError && (
                  <Alert variant="danger" >
                    <strong>{t('invalidConnection')}</strong>
                  </Alert>
                )
              }
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
              &nbsp;
              {t('or')}
              &nbsp;
              <a href={links.paths.signup}>
                {t('createAnAccount')}
              </a>
            </td>
            <td>
              <Button
                onClick={handleGoogleSignIn}
                type="button"
                variant="danger"
              >
                <span className="fa fa-google" />
                &nbsp;
                {t('loginWithGoogle')}
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default LoginPage;
