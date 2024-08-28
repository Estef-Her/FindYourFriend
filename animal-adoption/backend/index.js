const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

let animals = [
  { id: 1, name: 'Max', description: 'Friendly dog', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9rs0MTow94bGQrraNQZLMmhm4ck6qNz5UFQ&s' },
  { id: 2, name: 'Bella', description: 'Loyal cat', image: 'https://i.pinimg.com/736x/97/22/98/9722988011eb072ba0ac2b98221a726b.jpg' },
  { id: 3, name: 'Charlie', description: 'Playful rabbit', image: 'https://media.istockphoto.com/id/1041987488/es/foto/lindo-perro-de-poner-su-cara-en-sus-rodillas-y-el-hombre-sonriente-de-las-manos-rascarse-el.jpg?s=612x612&w=0&k=20&c=_-QrG1QimtXPttueHgPSkhchwUcn8DNtEclUpV991Cg=' }
];

app.get('/animals', (req, res) => {
  res.json(animals);
});

app.get('/animals/:id', (req, res) => {
  const animal = animals.find(a => a.id === parseInt(req.params.id));
  res.json(animal);
});

app.post('/animals', (req, res) => {
  const newAnimal = { id: animals.length + 1, ...req.body };
  animals.push(newAnimal);
  res.json(newAnimal);
});

// Datos de ejemplo para usuarios (en un entorno real usarías una base de datos)
const users = [
  { id: 1, email: 'user1@example.com', password: 'password123' },
  { id: 2, email: 'user2@example.com', password: 'mypassword' },
];

// Ruta de login
app.post('/login', (req, res) => {
  const { email, password } = req.body;
  
  // Verificar si el usuario existe
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    // Simulando la generación de un token (en un entorno real usarías JWT u otra técnica)
    res.json({ message: 'Login successful', userId: user.id });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
});

app.post('/logout', (req, res) => {
  // Aquí puedes implementar la lógica para invalidar la sesión del usuario
  // Por ejemplo, eliminar tokens de sesión, etc.
  res.status(200).send('Logout successful');
});

app.listen(4000, () => {
  console.log('Server running on port 4000');
});
