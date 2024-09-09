import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import '../css/Header.css';

function AdminHeader() {
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
      <Container className='Navbar'>
      <Navbar.Brand href="/admin" className="protest-guerrilla-regular">
          Eco Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
          <span className="navbar-toggler-icon" style={{ backgroundImage: "url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e')" }}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginTop: '-25px' }}>
            {/* Admin Dashboard Group */}
            <NavDropdown title="Dashboard" id="admin-dashboard-dropdown">
              <NavDropdown.Item href="/admin">Dashboard</NavDropdown.Item>
              <NavDropdown.Item href="/manageusers">Manage Users</NavDropdown.Item>
              <NavDropdown.Item href="/sellerqueries">Seller Queries</NavDropdown.Item>
            </NavDropdown>
            
            {/* Product Management Group */}
            <NavDropdown title="Products" id="product-management-dropdown">
              <NavDropdown.Item href="/manageproduct">Manage Products</NavDropdown.Item>
              <NavDropdown.Item href="/addproduct">Add Product</NavDropdown.Item>
              <NavDropdown.Item href="/mylistings">My Listings</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/orders">Orders</Nav.Link>

            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Furnitures">Furnitures</NavDropdown.Item>
              <NavDropdown.Item href="/Homewares">Homewares</NavDropdown.Item>
              <NavDropdown.Item href="/Electricalgoods">Electrical Goods</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href='/Wishlist'>Wishlist</Nav.Link>
            <Nav.Link href="/cart">Cart</Nav.Link>
            <Button variant="outline-light" onClick={handleLogout} style={{ marginTop: '-5px' }}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
