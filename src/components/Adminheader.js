import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'react-bootstrap/Image';
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
        <Navbar.Brand href="/admin-dashboard">
          <Image 
            className='Header-image' 
            src='https://s3-alpha-sig.figma.com/img/7913/ad79/c040184a6ef6a3699cee05ae04d252d9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WyBiPttJi1nCC1koC9TPA4cIoOZL3ch8jxmF29gn5i~awW1c9zLXxe6uwfV2JFq4A8thm8JVO8mIqqj9jvNOOv9ydpETO0jDQTgOT6Vf0t8GuliakyOjcoH8Fw5Ki-DYYVS2aOms92rEn4Hn~sq-5J6Bpqm~hODhRVrtU5NIJPYYk7eeiu~svm1QK836bFbl39BpebzmcHLCL2DiwLA~xQUM1GrnAD3A9wuh8164DmnvYezVGJv49lN12jXQvTdJcHOoQ31XKx3gE68lypY2DqTzAKuWGBxbbWdZXkHemffJOW3lC8UuvVi9TwgNRifFkFAcNiFhxQZ6eyQ3sLyLzw__'
            alt="Eco Shop"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
          <span className="navbar-toggler-icon" style={{ backgroundImage: "url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e')" }}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
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
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
