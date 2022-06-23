// == Import npm
import React from 'react';
import { Alert } from 'react-bootstrap';

// == Import

// == Custom components

// == Composant
const PageNotFound = () => (
  <>
    <Alert variant="danger">
      <Alert.Heading>Error 404</Alert.Heading>
      <p>
        Oh shoot! You seem lost...
      </p>
    </Alert>
  </>
);

// == Export
export default PageNotFound;
