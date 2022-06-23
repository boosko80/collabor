// == Import npm
import React, { useEffect, useState } from 'react';
import {
  Container,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';

// == Import
import { HTTP_STATUS } from '../../../constants';
import { fetchIdea } from '../../../features/ideas/idea.slice';

// == Custom components
import Header from '../../Common/Header';
import { selectFetchStatus, selectIdea } from './selectors';
import UserCard from '../UserList/UserCard';
import Loading from '../../Common/Loading';
import PageNotFound from '../../Common/Error/PageNotFound';
import IdeaDeleteModal from './idea-delete.modal';

// == Composant
const Idea = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const currentUserId = useSelector((state) => state.login.id);
  const status = useSelector(selectFetchStatus);
  const idea = useSelector(selectIdea);
  const isOwner = idea?.owner?.id === +currentUserId;
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const handleDeleteOnClick = () => {
    setShowDeleteModal(true);
  };

  useEffect(() => {
    dispatch(fetchIdea({ id }));
  }, [id]);

  return (
    <>
      <Header />

      <Container>
        { status === HTTP_STATUS.PENDING && (<Loading />)}
        { status === HTTP_STATUS.REJECTED && (<PageNotFound />)}
        { status === HTTP_STATUS.FULFILLED && (
          <>
            <IdeaDeleteModal idea={idea} show={showDeleteModal} handleClose={closeDeleteModal} />

            { isOwner && (
              <Button variant="danger" onClick={handleDeleteOnClick} className="mb-3">Delete idea</Button>
            )}
            <h1>{idea.name}</h1>
            <p>{idea.description}</p>
            <h2>Owner</h2>
            <UserCard user={idea.owner} />
          </>
        )}
      </Container>
    </>
  );
};

// == Export
export default Idea;
