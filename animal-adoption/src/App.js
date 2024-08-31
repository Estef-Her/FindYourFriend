import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AnimalDetail from './pages/AnimalDetail';
import PublishAnimal from './pages/PublishAnimal';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Logout from './pages/Logout';
function App() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [isAuthenticated, setIsAuthenticated] =  React.useState();

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <Router>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavBar  isAuthenticated={isAuthenticated} onSearch={handleSearch} />
        <div style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home searchTerm={searchTerm} />} />
            <Route path="/animal/:id" element={<AnimalDetail />} />
            <Route path="/publicar" element={<PublishAnimal />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/logout" element={<Logout setIsAuthenticated={setIsAuthenticated}/>} />
          </Routes>
        </div> 
        <Footer />       
      </div>      
    </Router>    
  );
}

export default App;
