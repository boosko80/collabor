// == Import npm
import React from 'react';
import {
  Container,
} from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Header from '../../Common/Header';

// == Import
import { HTTP_STATUS } from '../../../constants';

// == Custom components
import NewIdeaForm from './new-idea.form';
import AlertFailed from './new-idea-failed.alert';
import AlertSuccess from './new-idea-success.alert';

// == Composant
const NewIdea = () => {
  const status = useSelector((state) => state.ideaNew.status);
  const errors = useSelector((state) => state.ideaNew.errors);
  const newIdea = useSelector((state) => state.ideaNew.idea);

  return (
    <>
      <Header />
      <Container>
        { status === HTTP_STATUS.PENDING && (<p> LOADING </p>)}
        { status === HTTP_STATUS.REJECTED && (<AlertFailed data={errors} />)}
        { status === HTTP_STATUS.FULFILLED && (<AlertSuccess id={newIdea} />)}
        <NewIdeaForm />
      </Container>
    </>
  );
};

// == Export
export default NewIdea;
