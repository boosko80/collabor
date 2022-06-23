// == Import npm
import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Alert,
  Spinner,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

// == Import
import { HTTP_STATUS } from '../../../constants';
import { fetchUsersData } from '../../../features/users/user-list.slice';

// == Custom components
import Header from '../../Common/Header';
import UserCard from './UserCard';
import { selectFetchStatus, selectUserList } from './selectors';
import Loading from '../../Common/Loading';
import ErrorServer from '../../Common/Error/ErrorServer';

// == Composant
const UserList = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectFetchStatus);
  const userList = useSelector(selectUserList);

  useEffect(() => {
    dispatch(fetchUsersData());
  }, []);

  return (
    <>
      <Header />

      <Container>
        <h1>Here is the list of all the collab's</h1>
        <p>You can visit their profiles to check their ideas and/or contact them</p>

        { status === HTTP_STATUS.PENDING && (<Loading />)}
        { status === HTTP_STATUS.REJECTED && (<ErrorServer />)}
        { status === HTTP_STATUS.FULFILLED && (
        <Row xs={1} md={2} lg={4} className="g-4">
          { userList.map((user) => (
            <Col key={user.id}>
              <UserCard key={user.id} user={user} />
            </Col>
          ))}
        </Row>
        )}
      </Container>
    </>
  );
};

// == Export
export default UserList;
