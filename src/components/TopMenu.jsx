import React from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useTranslation } from 'react-i18next';
import SearchBar from 'components/UI/SearchBar';
import links from 'utils/links';
import Logo from 'images/logo.png';
import { operations } from 'services';
import './style.scss';

const TopMenu = () => {
  const login = useSelector(state => state.login);
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const handleLogout = () => {
    operations.login.logout()(dispatch)
      .then(() => {
        history.go(0);
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
              src={Logo}
              alt="fikas.io"
              className="d-inline-block align-top"
              height="50"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {
                login && <SearchBar
                  style={{
                    marginTop: 5,
                    marginRight: 50,
                  }}
                />
              }
              {
                login ? (
                  <NavDropdown title={login.user && login.user.name} align="end">
                    <NavDropdown.Item href={links.paths.settings}>{t('settings')}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href={links.paths.documentation}>{t('documentation')}</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={() => handleLogout()}>{t('logout')}</NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  <Nav.Link href={links.paths.login}>{t('login')}</Nav.Link>
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
