import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import '../css/Footer.css';

function Footer() {
    return (
      <Navbar data-bs-theme='dark' style={{height:'80px'}} className='Footer'>
        <Container className="d-flex flex-column align-items-center">
          <Nav className="mx-auto mb-3">
            <Nav.Item>
              <Nav.Link href="/aboutus">About Us</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/return-refund-policy">Return & Refund Policy</Nav.Link>
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