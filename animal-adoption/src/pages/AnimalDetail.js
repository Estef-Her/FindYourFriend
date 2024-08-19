import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';

function AnimalDetail() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/animals/${id}`)
      .then(response => setAnimal(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!animal) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Card>
        <Card.Img variant="top" src={animal.image} />
        <Card.Body>
          <Card.Title>{animal.name}</Card.Title>
          <Card.Text>{animal.description}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AnimalDetail;
