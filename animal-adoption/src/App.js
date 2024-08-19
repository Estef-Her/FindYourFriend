import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AnimalDetail from './pages/AnimalDetail';
import PublishAnimal from './pages/PublishAnimal';
import NavBar from './components/NavBar';

function App() {
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div>
        <NavBar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchTerm={searchTerm} />} />
          <Route path="/animal/:id" element={<AnimalDetail />} />
          <Route path="/publicar" element={<PublishAnimal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
