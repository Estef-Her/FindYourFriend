import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../images/logo.png';

function NavBar({ onSearch , isAuthenticated}) {
  const [searchTerm, setSearchTerm] = useState('');
  const location = useLocation(); // Obtenemos la ubicación actual

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };
  const token = localStorage.getItem('token');
  isAuthenticated = !!token;
  console.log(isAuthenticated);
  return (
    <Navbar className="custom-navbar" expand="lg">
      <Container>
      <Navbar.Brand as={Link} to="/">
          <img
            src={logo}
            alt="Logo"
            width="50" // Ajusta el tamaño del logo
            height="50"
            style={{margin:0,padding:0}} // Ajusta el tamaño del logo
          />
        </Navbar.Brand>
        <Navbar.Brand as={Link} to="/">
          <h3 style={{marginTop:10}}>Find your friend</h3>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className={location.pathname === '/' ? 'active' : ''}>Inicio</Nav.Link>
            {isAuthenticated && <Nav.Link  as={Link} to="/publicar" className={location.pathname === '/publicar' ? 'active' : ''}>Publicar</Nav.Link>}
            {isAuthenticated && <Nav.Link as={Link} to="/publicaciones" className={location.pathname === '/publicaciones' ? 'active' : ''}>Mis publicaciones</Nav.Link>}
            {!isAuthenticated && <Nav.Link as={Link} to="/login" className={location.pathname === '/login' ? 'active' : ''}>Iniciar Sesión</Nav.Link>}
            {isAuthenticated && <Nav.Link as={Link} to="/logout" className={location.pathname === '/logout' ? 'active' : ''}>Cerrar Sesión</Nav.Link>}
          </Nav>
          <Form className="d-flex" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Escriba"
              className="me-2"
              aria-label="Escriba para buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="outline-light" type="submit">Buscar</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
