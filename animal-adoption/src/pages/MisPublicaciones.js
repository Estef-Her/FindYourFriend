import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function MisPublicaciones() {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    var id=user.id;
    axios.get(`http://localhost:4000/animalsPorUsuario/${id}`)
      .then(response => {
        setAnimals(response.data);
        setFilteredAnimals(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  return (
    <Container className="mt-4">
     <h4>Mis publicaciones</h4>
      <Row className="mt-4">
        {filteredAnimals.map(animal => (
          <Col md={4} key={animal.id}>
            <Card className="mb-4">
              <Card.Img 
                variant="top" 
                src={animal.image || (animal.imageFile && `http://localhost:4000${animal.imageFile}`)} 
                alt={animal.name}
              />
              <Card.Body>
                <Card.Title>{animal.name}</Card.Title>
                <Card.Text>{animal.description}</Card.Text>
                <Card.Text>{animal.raza}</Card.Text>
                <Button as={Link} to={`/animal/${animal.id}`} variant="primary">Ver detalle</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default MisPublicaciones;
