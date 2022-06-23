// == Import npm
import React from 'react';
import {
  Modal, Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router';
import { HTTP_STATUS } from '../../../constants';

// == Import
import { sendDeleteIdea, reset } from '../../../features/ideas/idea-delete.slice';

// == Custom components

// == Composant
const IdeaDeleteModal = ({ idea, show, handleClose }) => {
  const { id, name } = idea;

  const dispatch = useDispatch();
  const status = useSelector((state) => state.ideaDelete.status);

  const handleDelete = () => {
    dispatch(sendDeleteIdea({ id }))
      .unwrap()
      .then(
        () => dispatch(reset()),
      );
  };

  return (
    <>
      { status === HTTP_STATUS.FULFILLED && (<Redirect to="/ideas" />)}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Warning !</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          You will permanently delete this idea : {name}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

// == Export
export default IdeaDeleteModal;
