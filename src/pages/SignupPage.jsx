import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { operations } from 'services';
import links from 'utils/links';
import { getFormData } from 'utils/forms';
import { initializeSocket } from 'utils/sockets';
import './style.scss';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSignupError: false,
    };
  }

  componentDidMount() {
    const { login, history, location } = this.props;
    login()
      .then(res => {
        if (res && res.payload) {
          initializeSocket();
          history.push(location.state ? location.state.from : links.paths.home);
        }
      })
      .catch(() => login(null));
  }

  handleSignup = () => {
    const { signup, history, location } = this.props;
    const formData = getFormData('Signup_form');
    signup(formData)
      .then(res => {
        if (res && res.user) {
          history.push(location.state ? location.state.from : links.paths.home);
        }
      })
      .catch(() => {
        this.setState({ showSignupError: true });
      });

    if (document.getElementById('password')) {
      document.getElementById('password').value = '';
    }
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleSignup();
    }
  }

  render() {
    const { showSignupError } = this.state;
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
              type="text"
              name='name'
              autoFocus
              placeholder='Nom'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              name='emailAddress'
              placeholder='Adresse courriel'
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              id='password'
              type="password"
              name="password"
              onKeyPress={this.handleKeyPress}
              placeholder='Mot de passe'
            />
          </Form.Group>
        </form>
        <Button
          variant='primary'
          onClick={this.handleSignup}
          type='submit'
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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: operations.login.login,
    signup: operations.login.signup,
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(SignupPage));
