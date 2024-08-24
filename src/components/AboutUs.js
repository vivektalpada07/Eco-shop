import Header from './Header';
import Footer from './Footer';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

function AboutUs() {
  return (
    <div className='wrapper'>
      <Header />
        <div className='content'>
          <Container className='AboutUs'>
            <Row className='Title'>
              <h3>About Us</h3>
            </Row>

            <Row className='Shop'>
              <h5>Discover our Eco Shop</h5>
            </Row>
      
            <Row className='Paragraph'>
              <p>
                The Eco Shop is a second-hand deal platform where customers can buy as well as sell their products
                <br></br> and the sellers can list their products to sell to the customers. We provide a variety of products 
                <br></br>from different categories such as furniture, homeware and electrical goods. 
                <br></br><br></br>
                Our goal is to provide low priced deals for customers to easily purchase their products without being worried
                <br></br> about the price and affordable to buy.  We provide easy navigation and efficiency for 
                <br></br> both customers and sellers to search, display and manage their products.
              </p>
            </Row>
            <img src="path_to_your_image.jpg" alt="AboutUs"/>
          </Container>
        </div>
      <Footer />
    </div>
  );
}

export default AboutUs;
