import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import '../css/Header.css';  // Ensure this file includes your CSS class

function Header() {
  return (
    <Navbar expand="lg" className='Header'>
      <Container className='w-100'>
        <Navbar.Brand href="/" className="protest-guerrilla-regular">
          Eco Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
          <span className="navbar-toggler-icon" style={{ backgroundImage: "url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e')" }}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Furnitures">Furnitures</NavDropdown.Item>
              <NavDropdown.Item href="/Homewares">Homewares</NavDropdown.Item>
              <NavDropdown.Item href="/Electricalgoods">Electrical Goods</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='/Wishlist'>Wishlist</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            
            <Nav.Link href="/login">
              <Button variant="outline-light" className="login-button">
                Login
              </Button>
            </Nav.Link>
            <Nav.Link href="/signup">
              <Button variant="light" className="signup-button">
                Signup
              </Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
