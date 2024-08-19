import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';

function Home({ searchTerm }) {
  const [animals, setAnimals] = useState([]);
  const [filteredAnimals, setFilteredAnimals] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/animals')
      .then(response => {
        setAnimals(response.data);
        setFilteredAnimals(response.data);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (searchTerm === '') {
      setFilteredAnimals(animals);
    } else {
      const filtered = animals.filter(animal =>
        animal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        animal.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredAnimals(filtered);
    }
  }, [searchTerm, animals]);

  return (
    <Container>
      <Row className="mt-4">
        {filteredAnimals.map(animal => (
          <Col md={4} key={animal.id}>
            <Card className="mb-4">
              <Card.Img variant="top" src={animal.image} />
              <Card.Body>
                <Card.Title>{animal.name}</Card.Title>
                <Card.Text>{animal.description}</Card.Text>
                <Button as={Link} to={`/animal/${animal.id}`} variant="primary">View Details</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
