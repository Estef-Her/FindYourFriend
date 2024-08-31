const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Crear la carpeta 'uploads' si no existe
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Carpeta donde se guardarán las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Nombre único para cada archivo
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 100 * 1024 * 1024 } // Limite de 50 MB
});

// Simulador de base de datos en memoria
let animals = [
  { id: 1, name: 'Max', description: 'Friendly dog', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9rs0MTow94bGQrraNQZLMmhm4ck6qNz5UFQ&s', imageFile: '',raza:'' },
  { id: 2, name: 'Bella', description: 'Loyal cat', image: 'https://i.pinimg.com/736x/97/22/98/9722988011eb072ba0ac2b98221a726b.jpg', imageFile: '',raza:'' },
  { id: 3, name: 'Charlie', description: 'Playful rabbit', image: 'https://media.istockphoto.com/id/1041987488/es/foto/lindo-perro-de-poner-su-cara-en-sus-rodillas-y-el-hombre-sonriente-de-las-manos-rascarse-el.jpg?s=612x612&w=0&k=20&c=_-QrG1QimtXPttueHgPSkhchwUcn8DNtEclUpV991Cg=', imageFile: '',raza:'' }
];

// Endpoint para obtener todos los animales
app.get('/animals', (req, res) => {
  res.json(animals);
});

// Endpoint para obtener un animal por ID
app.get('/animals/:id', (req, res) => {
  const animal = animals.find(a => a.id === parseInt(req.params.id));
  res.json(animal);
});

// Endpoint para crear un nuevo animal
app.post('/animals', upload.single('imageFile'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No se ha subido ningún archivo.' });
  }

  const { name, description, image,raza } = req.body;
  const imageFile = req.file;

  const newAnimal = {
    id: animals.length + 1,
    name,
    raza,
    description,
    image: image || '',
    imageFile: `/uploads/${imageFile.filename}`
  };

  animals.push(newAnimal);
  res.json(newAnimal);
});

// Configurar la carpeta de archivos estáticos para las imágenes subidas
app.use('/uploads', express.static('uploads'));

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
