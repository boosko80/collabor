// == Import npm
import React from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// == Import
import { sendRegisterForm } from '../../../features/auth/register.slice';
import {
  setUsername, setPassword, setConfirmPassword, setEmail, setGithubPage,
} from '../../../features/auth/register.slice';

// == Custom components

// == Composant
const RegisterForm = () => {
  const usernameValue = useSelector((state) => state.register.fields.username);
  const passwordValue = useSelector((state) => state.register.fields.password);
  const passwordConfirmValue = useSelector((state) => state.register.fields.passwordConfirm);
  const emailValue = useSelector((state) => state.register.fields.email);
  const githubPageValue = useSelector((state) => state.register.fields.githubPage);

  const dispatch = useDispatch();

  return (
    <>
      <Form onSubmit={() => dispatch(sendRegisterForm())}>
        <Form.Group className="mb-3" controlId="formRegisterUsername">
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

        <Form.Group className="mb-3" controlId="formRegisterEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your email"
            value={emailValue}
            onChange={(event) => dispatch(setEmail(event.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRegisterGithubPage">
          <Form.Label>Github Page</Form.Label>
          <Form.Control
            type="url"
            placeholder="Your github link"
            value={githubPageValue}
            onChange={(event) => dispatch(setGithubPage(event.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRegisterPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter your password"
            value={passwordValue}
            onChange={(event) => dispatch(setPassword(event.target.value))}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formRegisterPasswordConfirm">
          <Form.Label>Repeat Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm your password"
            value={passwordConfirmValue}
            onChange={(event) => dispatch(setConfirmPassword(event.target.value))}
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
export default RegisterForm;
