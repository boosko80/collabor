import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const UserCard = ({ user }) => {
  const { id, username } = user;

  return (
    <Card style={{ maxWidth: '18rem' }}>
      <Card.Body>
        <Card.Title>{username}</Card.Title>
        <Link to={`/users/${id}`}>
          <Button variant="primary">View profile</Button>
        </Link>
      </Card.Body>
    </Card>
  );
};

export default UserCard;
