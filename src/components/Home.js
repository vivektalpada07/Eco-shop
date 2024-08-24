import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Header from './Header';  
import Footer from './Footer';  
import '../App.css';

function Home() {
  return (
    <div className="wrapper">
      <Header />
      <Container className='Home'>
        <Row className="align-items-center mt-5">  {/* Kept the 'mt-5' for top margin */}
          <Col md={4} className='position-relative text-center'>
            <Image 
              src="https://s3-alpha-sig.figma.com/img/2d29/9193/c4ab0f5295631483e5e5d09c8ec15261?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=M29zRkDIfqTgGA9NSjGakftnhgawC~b~J-NfH-9Sbbj3PZuV3qqh8ZezhbFrL7QBznunmbbeBswz30w7853yH7feeVA9UQ4sUoRKukYIRvIe1a7dSbO7IPUlSf5d4Wwav~jBZtd4bypwh-g7dtstYe4yhqh5qfJK-GlZEwQ8qfLnJG3jjo6LMJpJDw75vPN0BNpSzP5J1BB3-HwF2ztfEczzQ8L3y80W3hMwzp~kicAlkVqZvyyUsKhhcXZB3xOPRoj5AdhpsAa6zO-3dXz~BaR9K2LaEwABdsV1HSid6OfUZp7a8LaHe54n88IMtYSW-a2BObwSBT1-iLFJFT8l3w__"
              className='image' fluid 
            />
          </Col>
          <Col md={8} className='d-flex align-items-center justify-content-center'>
            <h3 className="text-end">
              If you're ever in the market for any furniture, 
              <br />
              homewares, electrical goods, and more,
              <br />
              make the Eco Shop your first-stop shop!
            </h3>
          </Col>
        </Row>
        <br/>
        <Row>
          <h4>Trending Products</h4>
          {/* You can add more content here, such as a list of trending products */}
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Home;
