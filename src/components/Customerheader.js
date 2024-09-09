import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';
import { useUserAuth } from '../context/UserAuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase'; // Ensure you're importing the Firebase db instance
import '../css/Header.css';

function CustomerHeader() {
  const { logOut, user } = useUserAuth();
  const navigate = useNavigate();
  const [purchasedProducts, setPurchasedProducts] = useState([]);

  const handleLogout = async () => {
    try {
      await logOut();
      navigate('/login');
    } catch (error) {
      console.log("Failed to logout: ", error);
    }
  };

  // Fetch purchased products by the customer
  useEffect(() => {
    const fetchPurchasedProducts = async () => {
      if (user) {
        try {
          const q = query(collection(db, 'orders'), where('userId', '==', user.uid));
          const querySnapshot = await getDocs(q);
          const productsArray = querySnapshot.docs.map(doc => ({
            id: doc.id, 
            ...doc.data()
          }));
          setPurchasedProducts(productsArray);
        } catch (error) {
          console.error("Error fetching purchased products: ", error);
        }
      }
    };
    
    fetchPurchasedProducts();
  }, [user]);

  return (
    <Navbar expand="lg" className='Header'>
      <Container className='Navbar'>
        <Navbar.Brand href="/customer" className="protest-guerrilla-regular">
          Eco Shop
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }}>
          <span className="navbar-toggler-icon" style={{ backgroundImage: "url('data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255, 1)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e')" }}></span>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto" style={{ marginTop: '-25px' }}>
            <NavDropdown title="Products" id="basic-nav-dropdown" >
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

export default CustomerHeader;
