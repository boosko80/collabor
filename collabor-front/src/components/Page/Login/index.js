// == Import npm
import React, { useState } from 'react';
import {
  Offcanvas, Button, Alert,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

// == Import
import { HTTP_STATUS } from '../../../constants';

// == Custom components
import LoginForm from './LoginForm';
import Loading from '../../Common/Loading';

// == Composant
const LoginOffCanvas = ({ show, handleClose, handleOpenSignup }) => {
  const status = useSelector((state) => state.login.status);
  const isConnected = useSelector((state) => state.login.connected);

  const handleGoToRegister = () => {
    handleClose();
    handleOpenSignup();
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Login Form</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          { status === HTTP_STATUS.PENDING && (<Loading />)}
          { status === HTTP_STATUS.REJECTED && (
            <Alert variant="danger">Invalid credentials</Alert>
          )}
          { status === HTTP_STATUS.FULFILLED && (
            <Alert variant="success">You are now connected</Alert>
          )}
          { !isConnected && (
            <>
              <LoginForm />
              <br />
              <Button onClick={handleGoToRegister}>Sign up</Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

// == Export
export default LoginOffCanvas;
