import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Form, FormControl, Button } from 'react-bootstrap';
import logo from '../images/logo.png';

function NavBar({ onSearch , isAuthenticated}) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

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
            <Nav.Link as={Link} to="/">Inicio</Nav.Link>
            {isAuthenticated && <Nav.Link as={Link} to="/publicar">Publicar</Nav.Link>}
            {!isAuthenticated && <Nav.Link as={Link} to="/login">Iniciar Sesión</Nav.Link>}
            {isAuthenticated && <Nav.Link as={Link} to="/logout">Cerrar Sesión</Nav.Link>}
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
