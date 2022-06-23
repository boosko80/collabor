// == Import npm
import React, { useEffect } from 'react';
import {
  Button,
  Container,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { BsGithub } from 'react-icons/bs';
import { BiMailSend } from 'react-icons/bi';

// == Import
import { HTTP_STATUS } from '../../../constants';
import { fetchUser } from '../../../features/users/user.slice';

// == Custom components
import Header from '../../Common/Header';
import { selectFetchStatus, selectUser } from './selectors';
import UserIdeaList from './userIdeaList';
import PageNotFound from '../../Common/Error/PageNotFound';

// == Composant
const User = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const status = useSelector(selectFetchStatus);
  const user = useSelector(selectUser);

  useEffect(() => {
    dispatch(fetchUser({ id }));
  }, [id]);

  return (
    <>
      <Header />

      <Container>
        { status === HTTP_STATUS.PENDING && (<p> LOADING </p>)}
        { status === HTTP_STATUS.REJECTED && (
          <PageNotFound />
        )}
        { status === HTTP_STATUS.FULFILLED && (
          <>
            <h1>{user.username}</h1>

            {user?.githubPage && (
              <a href={user.githubPage}>
                <Button variant="dark" className="mb-2"><BsGithub />  Github</Button>
              </a>
            )}
            <br />
            {user?.email && (
              <a href={`mailto:${user.email}`}>
                <Button variant="dark" className="mb-2"><BiMailSend />  Email</Button>
              </a>
            )}

            <UserIdeaList ideaList={user.ideas} />
          </>
        )}
      </Container>
    </>
  );
};

// == Export
export default User;
