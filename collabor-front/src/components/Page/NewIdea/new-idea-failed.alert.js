// == Import npm
import React from 'react';
import {
  Alert,
} from 'react-bootstrap';

// == Import

// == Custom components

// == Composant
const AlertFailed = ({ data }) => {
  console.log(data);

  return (
    <>
      <Alert variant="danger">
        <Alert.Heading>Woops! The form is not valid...</Alert.Heading>
        <hr />
        <ul>
          { data.map((el) => (<li key={el}>{el}</li>))}
        </ul>
      </Alert>
    </>
  );
};

// == Export
export default AlertFailed;
