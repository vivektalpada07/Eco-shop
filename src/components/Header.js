import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Header() {
  return (
    <Navbar bg='success' data-bs-theme='dark' className='Header'>
      <Container>
          <Nav className="ms-auto" activeKey='/home'>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/link">About Us</Nav.Link>
            <NavDropdown title="Products" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Furniture</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Homewares</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Electrical Goods</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/login">Login & Register</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;