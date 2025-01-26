import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import MySearchBar from 'components/UI/SearchBar';
import Logo from 'images/logo.png';
import { useLogoutMutation } from 'services/login/api';
import { useAuth } from 'services/login/hooks';
import { setCredentials } from 'services/login/slice';
import envvars from 'utils/envvars';
import links from 'utils/links';
import './style.scss';

const TopMenu = () => {
  const auth = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [logout] = useLogoutMutation();

  const handleLogout = () => {
    logout()
      .then(() => {
        dispatch(setCredentials({ user: null }));
        navigate(links.paths.home);
      });
  };

  return (
    <div>
      <Container
        style={{
          position: 'fixed',
          minWidth: '100%',
          paddingTop: 0,
          paddingLeft: 0,
          paddingRight: 0,
          zIndex: 1000,
        }}
      >
        <Navbar bg="light" expand="lg">
          <Navbar.Brand href="/">
            <img
              alt="fikas.io"
              className="d-inline-block align-top"
              height="50"
              src={Logo}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {
                auth.user && <MySearchBar />
              }
              {
                auth.user ? (
                  <NavDropdown align="end" title={auth.user && auth.user.name}>
                    <NavDropdown.Item href={links.paths.organizations}>
                      <FontAwesomeIcon
                        icon="sitemap"
                        size="lg"
                        style={{
                          fontSize: 16,
                          marginRight: 10,
                        }}
                      />
                      {t('organizations')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href={links.paths.settings}>
                      <FontAwesomeIcon
                        icon="cog"
                        size="lg"
                        style={{
                          fontSize: 16,
                          marginRight: 10,
                        }}
                      />
                      {t('settings')}
                    </NavDropdown.Item>
                    <NavDropdown.Item href={links.paths.settings}>
                      <FontAwesomeIcon
                        icon="message"
                        size="lg"
                        style={{
                          fontSize: 16,
                          marginRight: 10,
                        }}
                      />
                      {t('feedback')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      href={envvars.urlDocumentation}
                    >
                      <FontAwesomeIcon
                        icon="book"
                        size="lg"
                        style={{
                          fontSize: 16,
                          marginRight: 10,
                        }}
                      />
                      {t('documentation')}
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout()}>
                      <FontAwesomeIcon
                        icon="power-off"
                        size="lg"
                        style={{
                          fontSize: 16,
                          marginRight: 10,
                        }}
                      />
                      {t('logout')}
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href={links.paths.login}>
                    {t('login')}
                  </Nav.Link>
                )
              }
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </div>
  );
};

export default TopMenu;
