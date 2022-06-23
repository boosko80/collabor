// == Import npm
import React from 'react';
import {
  Row,
  Col,
} from 'react-bootstrap';

// == Import

// == Custom components
import IdeaCard from '../IdeaList/IdeaCard';

// == Composant
const UserIdeaList = ({ ideaList }) => (
  <>
    { ideaList.length > 0
      ? (
        <>
          <h2>Submitted ideas</h2>
          <Row xs={1} md={2} lg={4} className="g-4">
            { ideaList.map((idea) => (
              <Col key={idea.id}>
                <IdeaCard key={idea.id} idea={idea} />
              </Col>
            ))}
          </Row>
        </>
      )
      : (
        <h2>No ideas submitted yet</h2>
      )}
  </>
);

// == Export
export default UserIdeaList;
