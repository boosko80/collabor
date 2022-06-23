// == Import npm
import React from 'react';
import {
  Container, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// == Import

// == Custom components
import Header from '../../Common/Header';

// == Composant
const Home = () => (
  <>
    <Header />

    <Container>
      <h1>Welcome on Collab'Or</h1>
      <p>
        This is a simple hero unit, a simple jumbotron-style component for calling
        extra attention to featured content or information.
      </p>
      <p>
        <Link to="/ideas">
          <Button variant="primary">Box of ideas</Button>
        </Link>
      </p>
    </Container>
  </>
);

// == Export
export default Home;
