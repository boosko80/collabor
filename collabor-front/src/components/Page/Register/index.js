// == Import npm
import React from 'react';
import {
  Offcanvas, Button,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';

// == Import
import { HTTP_STATUS } from '../../../constants';

// == Custom components
import RegisterForm from './RegisterForm';

// == Composant
const RegisterOffCanvas = ({ show, handleClose, handleOpenLogin }) => {
  const status = useSelector((state) => state.register.status);

  const handleGoToLogin = () => {
    handleClose();
    handleOpenLogin();
  };

  return (
    <>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Sign up Form</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          { status === HTTP_STATUS.PENDING && (<p> LOADING </p>)}
          { status === HTTP_STATUS.REJECTED && (<p> ERROR </p>)}
          { status === HTTP_STATUS.FULFILLED && (
            <>
              <p> SUCCESS </p>
              <Button onClick={handleGoToLogin}>Login</Button>
            </>
          )}
          { status !== HTTP_STATUS.FULFILLED && (
            <>
              <RegisterForm />
              <br />
              <Button onClick={handleGoToLogin}>Login</Button>
            </>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

// == Export
export default RegisterOffCanvas;
