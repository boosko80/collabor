// == Import npm
import React from 'react';
import {
  Alert,
} from 'react-bootstrap';

// == Import

// == Custom components

// == Composant
const ErrorServer = () => (
  <Alert variant="danger">
    <Alert.Heading>Server Error</Alert.Heading>
    <hr />
    <p>
      It seems like the server is under maintenance.
      Our little robots are working on it right now.
      Please try again later !
    </p>
  </Alert>
);

// == Export
export default ErrorServer;
