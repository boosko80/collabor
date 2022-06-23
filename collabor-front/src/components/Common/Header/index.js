// == Import npm
import React, { useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

// == Import
import LoginOffCanvas from '../../Page/Login';
import RegisterOffCanvas from '../../Page/Register';
import { logout } from '../../../features/auth/login.slice';
import logo from '../../../assets/logo.svg';

// == Composant
const Header = ({ showLogin, showRegister }) => {
  const [showLoginOffCanvas, setShowLoginOffCanvas] = useState(showLogin || false);
  const handleLoginOpen = () => setShowLoginOffCanvas(true);
  const handleLoginClose = () => setShowLoginOffCanvas(false);

  const [showRegisterOffCanvas, setShowRegisterOffCanvas] = useState(showRegister || false);
  const handleRegisterOpen = () => setShowRegisterOffCanvas(true);
  const handleRegisterClose = () => setShowRegisterOffCanvas(false);

  const dispatch = useDispatch();

  const handleLogout = () => dispatch(logout());

  const isConnected = useSelector((state) => state.login.connected);
  const currentUserId = useSelector((state) => state.login.id);

  return (
    <>
      <LoginOffCanvas
        show={showLoginOffCanvas}
        handleClose={handleLoginClose}
        handleOpenSignup={handleRegisterOpen}
      />
      <RegisterOffCanvas
        show={showRegisterOffCanvas}
        handleClose={handleRegisterClose}
        handleOpenLogin={handleLoginOpen}
      />
      <Navbar bg="dark" variant="dark" expand="sm" className="mb-5">

        <LinkContainer to="/" exact className="mx-2">
          <Navbar.Brand>
            <img
              src={logo}
              width="50"
              height="50"
              alt="Collab'Or Logo"
            />
          </Navbar.Brand>
        </LinkContainer>

        <Nav className="d-none d-md-block">
          <LinkContainer to="/" exact>
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>
        </Nav>

        <Nav className="m-auto">
          <LinkContainer to="/ideas" exact>
            <Nav.Link>The box of ideas</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/users" exact>
            <Nav.Link>Collab's</Nav.Link>
          </LinkContainer>
        </Nav>

        <Nav className="justify-content-end">
          {!isConnected && (
          <>
            <Button onClick={handleRegisterOpen} className="mx-2">Sign up</Button>
            <Button onClick={handleLoginOpen} className="mx-2">Log in</Button>
          </>
          )}
          {isConnected && (
            <>
              <LinkContainer to={`/users/${currentUserId}`} className="mx-2">
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <Button variant="danger" onClick={handleLogout} className="mx-2">Logout</Button>
            </>
          )}
        </Nav>
      </Navbar>
    </>
  );
};

// == Export
export default Header;
