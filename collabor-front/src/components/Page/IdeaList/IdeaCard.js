import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const IdeaCard = ({ idea }) => {
  const {
    id, name, completed, created_at,
  } = idea;

  const now = new Date();
  const createdAt = new Date(created_at);
  const hours = Math.round((now - createdAt) / (1000 * 60 * 24));

  return (
    <Card border={completed ? 'success' : 'danger'} style={{ maxWidth: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Link to={`/ideas/${id}`}>
          <Button variant="primary">View details</Button>
        </Link>
      </Card.Body>
      <Card.Footer>{completed ? ('Completed') : (`Created ${hours} hours ago`)}</Card.Footer>
    </Card>
  );
};

export default IdeaCard;
