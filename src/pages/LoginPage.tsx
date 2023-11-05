import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import usePrevious from 'use-previous';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { operations } from 'services';
import { googleSignIn } from 'services/login/endpoints';
import { RootState } from 'services/store';
import links from 'utils/links';
import { getFormData } from 'utils/forms';
import { initializeSocket } from 'utils/sockets';
import './style.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const loginState = useSelector((state: RootState) => state.login);
  const history = useHistory();
  const location = useLocation();
  const [showLoginError, setShowLoginError] = useState(false);
  const prevLoginState = usePrevious(loginState);

  useEffect(() => {
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
      {
        showLoginError && (
          <Alert variant="danger" >
            <strong>Connexion invalide</strong>
          </Alert>
        )
      }
      <form
        id="Login_form"
        className="formulaire"
      >
        <Form.Group>
          <Form.Control
            autoFocus
            name="emailAddress"
            placeholder="Adresse courriel"
            style={{ marginBottom: 10 }}
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            id="password"
            name="password"
            onKeyUp={handleKeyUp}
            placeholder="Mot de passe"
            type="password"
          />
        </Form.Group>
      </form>
      <Button
        onClick={handleLogin}
        type="submit"
        variant="primary"
      >
        Connexion
      </Button>
      <Button
        onClick={handleGoogleSignIn}
        type="button"
        variant="danger"
      >
        <span className="fa fa-google" />
        Sign in with Google
      </Button>
      &nbsp;
      ou
      &nbsp;
      <a href={links.paths.signup}>
        Créer un compte
      </a>
    </div>
  );
}

export default LoginPage;
