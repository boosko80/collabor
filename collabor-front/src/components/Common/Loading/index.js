// == Import npm
import React from 'react';
import { Spinner } from 'react-bootstrap';

// == Import

// == Composant
const Loading = () => (
  <Spinner animation="border" role="status">
    <span className="visually-hidden">Loading...</span>
  </Spinner>
);

// == Export
export default Loading;
