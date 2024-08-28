import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCartContext } from '../context/Cartcontext';
import { useUserAuth } from '../context/UserAuthContext'; 
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart } = useCartContext();
  const { user: currentUser } = useUserAuth();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    calculateTotalPrice(selectedProducts);
  }, [selectedProducts]);

  const calculateTotalPrice = (selectedProducts) => {
    const total = selectedProducts.reduce((acc, product) => {
      return acc + product.productPrice;
    }, 0);
    setTotalPrice(total.toFixed(2));
  };

  const handleBuyNow = (product) => {
    setSelectedProducts(prevSelectedProducts => {
      const isSelected = prevSelectedProducts.some(p => p.productId === product.productId);
      if (isSelected) {
        // If the product is already selected, remove it from the selection
        return prevSelectedProducts.filter(p => p.productId !== product.productId);
      } else {
        // Add the product to the selected list
        return [...prevSelectedProducts, product];
      }
    });
  };

  const handleCheckout = () => {
    if (!currentUser) {
      alert("You need to log in to proceed to checkout.");
      return;
    }
    navigate('/checkout');
  };

  if (!currentUser) {
    return (
      <div className="wrapper">
        <Header />
        <div className="content">
          <Container>
            <p className="text-center">You need to log in to view your cart.</p>
            <div className="text-center">
              <Button variant="primary" onClick={() => navigate('/login')}>Log In</Button>
            </div>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }

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
                        <Card.Text><strong>Price: ${product.productPrice.toFixed(2)}</strong></Card.Text>
                        <Button 
                          variant={selectedProducts.some(p => p.productId === product.productId) ? "success" : "primary"}
                          onClick={() => handleBuyNow(product)}
                          className={`buy-now-button ${selectedProducts.some(p => p.productId === product.productId) ? 'selected' : ''}`}
                        >
                          {selectedProducts.some(p => p.productId === product.productId) ? '✓ Selected' : 'Buy Now'}
                        </Button>
                        <Button 
                          variant="danger" 
                          onClick={() => removeFromCart(product.productId)}
                          className="remove-cart-button"
                        >
                          Remove from Cart
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {totalPrice > 0 && (
                <div className="text-center mt-4">
                  <h3>Total Price for Selected Products: ${totalPrice}</h3>
                </div>
              )}
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
