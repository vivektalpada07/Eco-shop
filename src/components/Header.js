import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Image from 'react-bootstrap/Image';
import '../App.css';

function Header() {
  return (
    <Navbar bg='success' data-bs-theme='dark' className='Header'>
      <Container>
        <Image className='Header-image' src='https://s3-alpha-sig.figma.com/img/7913/ad79/c040184a6ef6a3699cee05ae04d252d9?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=WyBiPttJi1nCC1koC9TPA4cIoOZL3ch8jxmF29gn5i~awW1c9zLXxe6uwfV2JFq4A8thm8JVO8mIqqj9jvNOOv9ydpETO0jDQTgOT6Vf0t8GuliakyOjcoH8Fw5Ki-DYYVS2aOms92rEn4Hn~sq-5J6Bpqm~hODhRVrtU5NIJPYYk7eeiu~svm1QK836bFbl39BpebzmcHLCL2DiwLA~xQUM1GrnAD3A9wuh8164DmnvYezVGJv49lN12jXQvTdJcHOoQ31XKx3gE68lypY2DqTzAKuWGBxbbWdZXkHemffJOW3lC8UuvVi9TwgNRifFkFAcNiFhxQZ6eyQ3sLyLzw__'/>
          <Nav className="ms-auto" activeKey='/home'>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/aboutus">About Us</Nav.Link>
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              <NavDropdown.Item href="">Furniture</NavDropdown.Item>
              <NavDropdown.Item href="">Homewares</NavDropdown.Item>
              <NavDropdown.Item href="">Electrical Goods</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/login&register">Login & Register</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;