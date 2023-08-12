import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { operations } from 'services';
import links from 'utils/links';
import { getFormData } from 'utils/forms';
import { initializeSocket } from 'utils/sockets';
import './style.scss';

const SignupPage = () => {
  const dispatch = useDispatch();
  const [showSignupError, setShowSignupError] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    operations.login.login()(dispatch)
      .then(res => {
        if (res && res.payload) {
          initializeSocket();
          history.push(location.state ? location.state.from : links.paths.home);
        }
      })
      .catch(() => operations.login.login(null)(dispatch));
  }, []);

  const handleSignup = () => {
    const formData = getFormData('Signup_form');
    operations.login.signup(formData)(dispatch)
      .then(res => {
        if (res && res.user) {
          history.push(location.state ? location.state.from : links.paths.home);
        }
      })
      .catch(() => {
        setShowSignupError(true);
      });

    if (document.getElementById('password')) {
      document.getElementById('password').value = '';
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter') {
      handleSignup();
    }
  };

  return (
    <div className="Signup">
      {
        showSignupError && (
          <Alert variant="danger" >
            <strong>Soumission invalide</strong>
          </Alert>
        )
      }
      <form
        id="Signup_form"
        className="formulaire"
      >
        <Form.Group>
          <Form.Control
            autoFocus
            name="name"
            placeholder="Nom"
            style={{ marginBottom: 10 }}
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            name="emailAddress"
            placeholder="Adresse courriel"
            style={{ marginBottom: 10 }}
            type="text"
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            id="password"
            type="password"
            name="password"
            onKeyPress={handleKeyPress}
            placeholder="Mot de passe"
          />
        </Form.Group>
      </form>
      <Button
        variant="primary"
        onClick={handleSignup}
        type="submit"
      >
        Créer un compte
      </Button>
      &nbsp;
      ou
      &nbsp;
      <a href={links.paths.login}>
        Connexion
      </a>
    </div>
  );
};

export default SignupPage;
