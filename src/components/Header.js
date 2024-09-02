import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import '../css/Header.css';

function Header() {
  return (
    <Navbar expand="lg" className='Header'>
      <Container className='Navbar'>
        <Navbar.Brand href="/">
          <Image 
            className='Header-image' 
            src='https://s3-alpha-sig.figma.com/img/7913/ad79/c040184a6ef6a3699cee05ae04d252d9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WyBiPttJi1nCC1koC9TPA4cIoOZL3ch8jxmF29gn5i~awW1c9zLXxe6uwfV2JFq4A8thm8JVO8mIqqj9jvNOOv9ydpETO0jDQTgOT6Vf0t8GuliakyOjcoH8Fw5Ki-DYYVS2aOms92rEn4Hn~sq-5J6Bpqm~hODhRVrtU5NIJPYYk7eeiu~svm1QK836bFbl39BpebzmcHLCL2DiwLA~xQUM1GrnAD3A9wuh8164DmnvYezVGJv49lN12jXQvTdJcHOoQ31XKx3gE68lypY2DqTzAKuWGBxbbWdZXkHemffJOW3lC8UuvVi9TwgNRifFkFAcNiFhxQZ6eyQ3sLyLzw__'
            alt="Eco Shop"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="navbar-toggler">
          <span className="navbar-toggler-icon"></span>
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
