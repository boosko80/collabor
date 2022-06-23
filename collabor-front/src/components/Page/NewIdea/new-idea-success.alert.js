// == Import npm
import React from 'react';
import {
  Alert, Button,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';

// == Import

// == Custom components

// == Composant
const AlertSuccess = ({ id }) => (
  <>
    <Alert variant="success">
      <Alert.Heading>Perfect! Your idea is now in the box.</Alert.Heading>
      <hr />
      <Link to={`/ideas/${id}`}>
        <Button variant="success">View your new idea</Button>
      </Link>
    </Alert>
  </>
);

// == Export
export default AlertSuccess;
