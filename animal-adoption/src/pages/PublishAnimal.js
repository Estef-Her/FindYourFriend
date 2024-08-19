import React from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';

// Esquema de validación de Yup
const validationSchema = yup.object().shape({
  name: yup.string().required('Animal name is required'),
  description: yup.string().required('Description is required'),
  image: yup.string().url('Invalid URL').required('Image URL is required'),
});

function PublishAnimal() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axios.post('http://localhost:4000/animals', values)
        .then(response => {
          navigate('/');
        })
        .catch(error => console.error(error));
    },
  });

  return (
    <Container className="mt-4">
      <h2>Publicar</h2>
      <Form onSubmit={formik.handleSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Nombre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nombre"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.name && formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="description" className="mt-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Descripción"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.description && formik.errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.description}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group controlId="image" className="mt-3">
          <Form.Label>URL de Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL de Imagen"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.image && formik.errors.image}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.image}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-3">
          Publicar
        </Button>
      </Form>
    </Container>
  );
}

export default PublishAnimal;
