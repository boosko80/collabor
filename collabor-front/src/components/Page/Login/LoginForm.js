// == Import npm
import React from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// == Import
import { setUsername, setPassword, sendLoginForm } from '../../../features/auth/login.slice';

// == Custom components

// == Composant
const LoginForm = () => {
  const usernameValue = useSelector((state) => state.login.fields.username);
  const passwordValue = useSelector((state) => state.login.fields.password);

  const dispatch = useDispatch();

  const handleOnSubmit = () => {
    dispatch(sendLoginForm());
  };

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter your username"
            value={usernameValue}
            onChange={(event) => dispatch(setUsername(event.target.value))}
          />
          <Form.Text className="text-muted">
            Don't worry, we won't steal your cookies.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={passwordValue}
            onChange={(event) => dispatch(setPassword(event.target.value))}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
};

// == Export
export default LoginForm;
