import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCartContext } from '../context/Cartcontext';  // Adjusted to match your file name
import Header from './Header';
import Footer from './Footer';
import '../App.css';

function Cart() {
  const { cartItems, removeFromCart } = useCartContext();

  // Calculate the total price of all items in the cart
  const totalPrice = cartItems.reduce((total, item) => total + item.productPrice, 0);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Container>
          <h2 className="text-center mb-4">Your Cart</h2>
          {cartItems.length > 0 ? (
            <>
              <Row className="justify-content-center">
                {cartItems.map((product, index) => (
                  <Col md={4} key={index}>
                    <Card className="mb-4 product-card">
                      <Card.Img variant="top" src={product.imageUrl} alt={product.productName} />
                      <Card.Body className="product-card-body">
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>{product.productDescription}</Card.Text>
                        <Card.Text><strong>Price: ${product.productPrice}</strong></Card.Text>
                        <Button 
                          variant="danger" 
                          onClick={() => removeFromCart(product.id)}
                        >
                          Remove from Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <h3 className="text-center mt-4">Total Price: ${totalPrice.toFixed(2)}</h3>
              <div className="text-center mt-3">
                <Button variant="success" size="lg">Proceed to Checkout</Button>
              </div>
            </>
          ) : (
            <p className="text-center">Your cart is empty.</p>
          )}
        </Container>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
