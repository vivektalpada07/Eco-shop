import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useWishlistContext } from '../context/Wishlistcontext';  
import Footer from './Footer';
import '../css/Wishlist.css';
import { useNavigate } from 'react-router-dom';
import HeaderSwitcher from './HeaderSwitcher';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlistContext();
  const navigate = useNavigate();

  // Calculate the total price of all items in the wishlist
  const totalPrice = wishlist.reduce((total, item) => total + item.productPrice, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (wishlist.length === 0) {
    return (
      <div className="wrapper">
        <HeaderSwitcher/>
        <div className="content">
          <Container>
            <p className="text-center">Your wishlist is empty.</p>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="wrapper">
      <HeaderSwitcher/>
      <div className="main-content">
        <Container>
          <h2 className="text-center mb-4">Your Wishlist</h2>
          <Row className="justify-content-center">
            {wishlist.map((product, index) => (
              <Col md={4} key={product.productId}>
                <Card className="mb-4 product-card">
                  {product.imageUrl && (
                    <Card.Img variant="top" src={product.imageUrl} alt={product.productName} />
                  )}
                  <Card.Body className="product-card-body">
                    <Card.Title>{product.productName}</Card.Title>
                    <Card.Text>{product.productDescription}</Card.Text>
                    <Card.Text><strong>Price: ${product.productPrice.toFixed(2)}</strong></Card.Text>
                    <Card.Text>Seller: {product.sellerUsername}</Card.Text> {/* Display Seller's Username */}
                    <Button 
                      variant="danger" 
                      onClick={() => removeFromWishlist(product.productId)}
                    >
                      Remove from Wishlist
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <h3 className="text-center mt-4">Total Price: ${totalPrice.toFixed(2)}</h3>
          <div className="text-center mt-3">
            <Button 
              variant="success" 
              size="lg" 
              className="checkout-button"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </Button>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;
