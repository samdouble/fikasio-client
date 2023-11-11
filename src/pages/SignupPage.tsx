import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { operations } from 'services';
import links from 'utils/links';
import { getFormData } from 'utils/forms';
import { initializeSocket } from 'utils/sockets';
import './style.scss';

const SignupPage = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [showSignupError, setShowSignupError] = useState(false);
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    operations.login.login()(dispatch)
      .then(res => {
        if (res) {
          initializeSocket();
          history.push(location.state ? location.state.from : links.paths.home);
        }
      })
      .catch(() => operations.login.login(null)(dispatch));
  }, []);

  const handleSignup = () => {
    const formData: any = getFormData('Signup_form');
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
      {
        showSignupError && (
          <Alert variant="danger" >
            <strong>{t('invalidSubmission')}</strong>
          </Alert>
        )
      }
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
      <Button
        variant="primary"
        onClick={handleSignup}
        type="submit"
      >
        {t('createAnAccount')}
      </Button>
      &nbsp;
      {t('or')}
      &nbsp;
      <a href={links.paths.login}>
        {t('login')}
      </a>
    </div>
  );
};

export default SignupPage;
