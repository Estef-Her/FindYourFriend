import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Form, Button,Spinner } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import * as tmImage from '@teachablemachine/image';
import imageCompression from 'browser-image-compression';

// Esquema de validación de Yup
const validationSchema = yup.object().shape({
  name: yup.string().required('El nombre es requerido'),
  description: yup.string().required('La descripción es requerida'),
  raza:yup.string().required('La raza es requerida'),
  image: yup.string().url('Invalid URL'),
});

function PublishAnimal() {
  const navigate = useNavigate();
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [raza, setRaza] = useState(''); // Estado para la raza
  const [loading, setLoading] = useState(false); 

  const URL = "https://teachablemachine.withgoogle.com/models/lS3pHIPWc/";

  // Cargar el modelo al montar el componente
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = URL + "model.json";
      const metadataURL = URL + "metadata.json";

      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };

    loadModel();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      raza: '',
      image: '', // Para la URL de la imagen
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('description', values.description);
      formData.append('raza', raza); // Incluir raza en el FormData
      const user = JSON.parse(localStorage.getItem('user'));
      formData.append('usuario', user.id);
      
      // Si hay un archivo, agregarlo
      if (imageFile) {
        var file = base64ToFile(imageFile,values.name.replace(' ',''));
        console.log(file);
        formData.append('imageFile', file);
      }
  
      // Si hay una URL de imagen, agregarla
      if (values.image) {
        formData.append('image', values.image);
      }
      // Obtener el token de autenticación
      axios.post('http://localhost:4000/animals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response.data);
        navigate('/');
      })
      .catch(error => {
        console.error('Error uploading file:', error);
      });
    },
  });
  function getBase64(file, callback) {
    const reader = new FileReader();

    reader.onloadend = () => {
        const base64data = reader.result.split(',')[1]; // Obtiene solo la parte base64
        callback(base64data); // Llama al callback con el base64
    };

    reader.readAsDataURL(file); // Lee el archivo como un URL de datos
}
  function getBase64FileExtension(base64String) {
    // Verificar si la cadena base64 contiene el prefijo de tipo MIME
    const matches = base64String.match(/^data:(.+);base64,/);
    if (matches && matches[1]) {
        // Obtener el tipo MIME
        const mimeType = matches[1];
        const format = mimeType.split("/")[1]; 

        // Retornar la extensión correspondiente
        return format; // Retorna null si no hay coincidencia
    }
    return null; // Retorna null si la cadena no tiene el formato correcto
}
  function base64ToFile(base64String, fileName) {
    // Divide la cadena base64 en dos partes: el tipo de contenido y los datos
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1]; // Obtener el tipo MIME de la cadena
    const bstr = atob(arr[1]); // Decodificar la parte de datos
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // Convertir la cadena decodificada a un array de bytes
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }

    // Crear y devolver un objeto File
    return new File([u8arr], fileName, { type: mime });
}
  // Manejar la selección de archivo
  const handleFileChange = (event) => {
    setLoading(true); // Inicia la carga
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageFile(e.target.result);
        validateImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  // Validar la imagen con el modelo de Teachable Machine
  const validateImage = async (imageSrc) => {
    if (model && imageSrc) {
      const imgElement = document.createElement("img");
      imgElement.src = imageSrc;
      imgElement.onload = async () => {
        const prediction = await model.predict(imgElement);
        // Filtra solo las predicciones con más de 0% de probabilidad
        var razaS = "";
        prediction.forEach((pred) => {
          if (Math.round(pred.probability * 100) > 0) {
            razaS += (razaS !== "" ? ", " : "") + pred.className;
          }
        });

        // Muestra las predicciones filtradas
        // filteredPredictions.forEach((prediction) => {
        //   console.log(
        //     `${prediction.className}: ${Math.round(
        //       prediction.probability * 100
        //     )}%`
        //   );
        // });
        // setPredictions(filteredPredictions);
        setRaza(razaS);
        formik.setFieldValue('raza', razaS);
        setLoading(false);
      };
    }
  };

  return (
    <Container className="mt-4">
      <h4>Publicar</h4>
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
        <Form.Group controlId="raza" className="mt-3">
          <Form.Label>Raza</Form.Label>
          <Form.Control
            type="text"
            placeholder="Raza"
            value={formik.values.raza}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.raza && formik.errors.raza}
            disabled={!imageFile} // Deshabilitar si no hay imagen seleccionada
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.raza}
          </Form.Control.Feedback>
        </Form.Group>
        {/* <Form.Group controlId="image" className="mt-3">
          <Form.Label>URL de Imagen</Form.Label>
          <Form.Control
            type="text"
            placeholder="URL de Imagen"
            value={formik.values.image}
            onChange={handleUrlChange}
            onBlur={formik.handleBlur}
            isInvalid={formik.touched.image && formik.errors.image}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.image}
          </Form.Control.Feedback>
        </Form.Group> */}

        <Form.Group controlId="imageFile" className="mt-3">
          <Form.Label>Selecciona una imagen:</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </Form.Group>

        {imageFile && <img src={imageFile} alt="Uploaded" style={{ marginTop: '20px', maxWidth: '300px' }} />}
        {/* {predictions.length > 0 && (
          <div id="label-container" style={{ marginTop: '20px' }}>
            {predictions.map((prediction, index) => (
              <div key={index}>
                {prediction.className}: {prediction.probability.toFixed(2)}
              </div>
            ))}
          </div>
        )} */}
{loading && (
          <div className="mt-3">
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Procesando...</span>
            </Spinner>
            <p>Espere procesando...</p>
          </div>
        )}
        <Button variant="primary" type="submit" className="mt-3" disabled={loading}>
          Publicar
        </Button>
      </Form>
    </Container>
  );
}

export default PublishAnimal;
