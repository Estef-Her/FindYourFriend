import React, { useEffect, useState } from 'react';
import { useParams,useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { Container, Card,Button  } from 'react-bootstrap';

function AnimalDetail() {
  const { id } = useParams();
  const [animal, setAnimal] = useState(null);
  const navigate = useNavigate(); // Inicializa useNavigate

  useEffect(() => {
    axios.get(`http://localhost:4000/animals/${id}`)
      .then(response => setAnimal(response.data))
      .catch(error => console.error(error));
  }, [id]);

  if (!animal) return <p>Loading...</p>;

  return (
    <Container className="mt-4">
      <Card>
      <Card.Img 
                variant="top" 
                src={animal.image || (animal.imageFile && `http://localhost:4000${animal.imageFile}`)} 
                alt={animal.name}
              />
        <Card.Body>
          <Card.Title>{animal.name}</Card.Title>
          <Card.Text>{animal.description}</Card.Text>
          <Button variant="secondary" onClick={() => navigate(-1)} className="mt-3">
            Regresar
          </Button>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AnimalDetail;
