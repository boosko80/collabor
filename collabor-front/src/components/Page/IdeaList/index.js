// == Import npm
import React, { useEffect } from 'react';
import {
  Container,
  Row,
  Col,
  Button,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// == Import
import { HTTP_STATUS } from '../../../constants';
import { fetchIdeasData } from '../../../features/ideas/idea-list.slice';

// == Custom components
import Header from '../../Common/Header';
import IdeaCard from './IdeaCard';
import { selectFetchStatus, selectIdeaList } from './selectors';
import Loading from '../../Common/Loading';
import ErrorServer from '../../Common/Error/ErrorServer';

// == Composant
const IdeaList = () => {
  const dispatch = useDispatch();
  const status = useSelector(selectFetchStatus);
  const ideaList = useSelector(selectIdeaList);

  useEffect(() => {
    dispatch(fetchIdeasData());
  }, []);

  return (
    <>
      <Header />

      <Container>
        <h1>Here is the list of all the ideas submitted</h1>
        <p>The borders show whether the ideas has been completed (green) or not (red)</p>
        <Link to="/ideas/new">
          <Button variant="success" className="mb-5">Create Idea</Button>
        </Link>

        <br />

        { status === HTTP_STATUS.PENDING && (<Loading />)}

        { status === HTTP_STATUS.REJECTED && (<ErrorServer />)}

        { status === HTTP_STATUS.FULFILLED && (
        <Row xs={1} md={2} lg={4} className="g-4">
          { ideaList.map((idea) => (
            <Col key={idea.id}>
              <IdeaCard key={idea.id} idea={idea} />
            </Col>
          ))}
        </Row>
        )}

      </Container>
    </>
  );
};

// == Export
export default IdeaList;
