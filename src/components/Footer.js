import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../App.css';

function Footer() {
    return (
      <Navbar bg='success' data-bs-theme='dark' style={{height:'80px'}}>
        <Container className="d-flex flex-column align-items-center">
          <Nav className="mx-auto mb-3">
            <Nav.Item>
              <Nav.Link href="/aboutus">About Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/r&rpolicy">Return & Refund Policy</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/contactus">Contact Us</Nav.Link>
            </Nav.Item>
          </Nav>
          <p className="Copyright">Copyright &copy; 2024 Eco Shop</p>
        </Container>
      </Navbar>
    );
  }
  

export default Footer;