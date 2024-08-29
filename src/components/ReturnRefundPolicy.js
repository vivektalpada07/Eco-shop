import Header from './Header';
import Footer from './Footer';
import '../css/ReturnRefundPolicy.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap';

function ReturnAndRefundPolicy() {
  return (
    <div className='wrapper'>
      <Header />
        <div className='content'>
          <Container className='RRPolicy'>
            <Row className='Title'>
              <h3>Return & Refund Policy</h3>
            </Row>

            <Row>
              <p>
                Thankyou for shopping at Eco Shop. In any case if you are not satisfied with your
                <br></br>
                purchase you can follow the return and refund process as mentioned below.
              </p>
            </Row>
            <br></br>
            <Row className='Return'>
              <h5>Returns</h5>
            </Row>
      
            <Row className='Description'>
              <p>
                You have only 30 days to return a product from the date you received it. To be
                eligible for a return, your product must be unused and it needs to have the proof 
                of purchase.
              </p>
            </Row>

            <Row className='Refund'>
              <h5>Refunds</h5>
            </Row>
      
            <Row className='Description'>
              <p>
                Once we receive your product, we will let you know that we have received your product.
                If your product is approved, we will do a refund to any payment method of your choice.
              </p>
            </Row>
          </Container>
        </div>
      <Footer />
    </div>
  );
}

export default ReturnAndRefundPolicy;
