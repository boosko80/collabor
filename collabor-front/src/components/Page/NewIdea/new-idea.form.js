// == Import npm
import React, { useEffect } from 'react';
import {
  Button, Form,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import {
  sendIdeaNewForm, setDescription, setName, resetForm,
} from '../../../features/ideas/idea-new.slice';

// == Import

// == Custom components

// == Composant
const NewIdeaForm = () => {
  const nameValue = useSelector((state) => state.ideaNew.fields.name);
  const descriptionValue = useSelector((state) => state.ideaNew.fields.password);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(resetForm());
  }, []);

  return (
    <>
      <h1>Create a new idea here</h1>
      <Form onSubmit={() => dispatch(sendIdeaNewForm())}>
        <Form.Group className="mb-3" controlId="formBasicIdeaName">
          <Form.Label>Name of the idea</Form.Label>
          <Form.Control
            type="input"
            placeholder="Enter the name"
            value={nameValue}
            onChange={(event) => dispatch(setName(event.target.value))}
          />
          <Form.Text className="text-muted">
            This field is mandatory.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicIdeaDesc">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter the description"
            value={descriptionValue}
            onChange={(event) => dispatch(setDescription(event.target.value))}
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
export default NewIdeaForm;
