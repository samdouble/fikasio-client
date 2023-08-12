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

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showLoginError: false,
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

  handleLogin = () => {
    const { login, history, location } = this.props;
    const formData = getFormData('Login_form');
    login(formData.emailAddress, formData.password)
      .then(res => {
        if (res && res.payload) {
          initializeSocket();
          history.push(location.state ? location.state.from : links.paths.home);
        }
      })
      .catch(() => {
        this.setState({ showLoginError: true });
      });

    if (document.getElementById('password')) {
      document.getElementById('password').value = '';
    }
  }

  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleLogin();
    }
  }

  render() {
    const { showLoginError } = this.state;
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
              type="text"
              name="emailAddress"
              autoFocus
              placeholder="Adresse courriel"
              style={{ marginBottom: 10 }}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              id="password"
              type="password"
              name="password"
              onKeyPress={this.handleKeyPress}
              placeholder="Mot de passe"
            />
          </Form.Group>
        </form>
        <Button
          variant="primary"
          onClick={this.handleLogin}
          type="submit"
        >
          Connexion
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
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login: operations.login.login,
  }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));
