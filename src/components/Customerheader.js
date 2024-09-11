import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import '../css/Header.css';

function CustomerHeader() {
  const { logOut } = useUserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log("Failed to logout: ", error);
    }
  };

  return (
    <Navbar expand="lg" className='Header'>
      <Container className='Navbar' style={{marginTop: 10}}>
        <Navbar.Brand href="/customer" className="protest-guerrilla-regular" style={{marginTop: 5}}>
          Eco Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavDropdown title="Category" id="basic-nav-dropdown">
            <NavDropdown.Item href="/Allproducts">AllProducts</NavDropdown.Item>
              <NavDropdown.Item href="/Furnitures">Furnitures</NavDropdown.Item>
              <NavDropdown.Item href="/Homewares">Homewares</NavDropdown.Item>
              <NavDropdown.Item href="/Electricalgoods">Electrical Goods</NavDropdown.Item>
              <NavDropdown.Item href="/Otherproducts">OtherProducts</NavDropdown.Item>
            </NavDropdown>
            <Button variant="outline-light" onClick={() => navigate("/customer-orders")}>
            Orders
            </Button>
            <Nav.Link href='/beseller'>BeSeller</Nav.Link>
            <Nav.Link href='/Wishlist'>Wishlist</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CustomerHeader;
