import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useWishlistContext } from '../context/Wishlistcontext';  
import Header from './Header';
import Footer from './Footer';
import '../App.css';

function Wishlist() {
  const { wishlist, removeFromWishlist } = useWishlistContext();

  // Calculate the total price of all items in the wishlist
  const totalPrice = wishlist.reduce((total, item) => total + item.productPrice, 0);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Container>
          <h2 className="text-center mb-4">Your Wishlist</h2>
          {wishlist.length > 0 ? (
            <>
              <Row className="justify-content-center">
                {wishlist.map((product, index) => (
                  <Col md={4} key={index}>
                    <Card className="mb-4 product-card">
                      {product.imageUrl && (
                        <Card.Img variant="top" src={product.imageUrl} alt={product.productName} />
                      )}
                      <Card.Body className="product-card-body">
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>{product.productDescription}</Card.Text>
                        <Card.Text><strong>Price: ${product.productPrice.toFixed(2)}</strong></Card.Text>
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
                <Button variant="success" size="lg" className="checkout-button">
                  Proceed to Checkout
                </Button>
              </div>
            </>
          ) : (
            <p className="text-center">Your wishlist is empty.</p>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Wishlist;
