import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useCartContext } from '../context/Cartcontext';  
import Header from './Header';
import Footer from './Footer';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart } = useCartContext();
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // This is a navigation hook
  const navigate = useNavigate();

  // Filter out duplicate items by their id
  const uniqueItems = cartItems.filter((item, index, self) =>
    index === self.findIndex((t) => t.id === item.id)
  );

  useEffect(() => {
    // Calculate the total price of all selected products
    const newTotalPrice = selectedProducts.reduce((total, product) => {
      const cartProduct = uniqueItems.find(item => item.id === product.id);
      if (cartProduct) {
        return total + cartProduct.productPrice * (cartProduct.quantity || 1);
      }
      return total;
    }, 0);
    setTotalPrice(newTotalPrice.toFixed(2));
  }, [selectedProducts, cartItems, uniqueItems]);

  const handleBuyNow = (product) => {
    setSelectedProducts(prevSelectedProducts => {
      const isSelected = prevSelectedProducts.some(p => p.id === product.id);
      if (isSelected) {
        // Remove the product if it's already selected
        return prevSelectedProducts.filter(p => p.id !== product.id);
      } else {
        // Add the product if it's not selected
        return [...prevSelectedProducts, product];
      }
    });
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Container>
          <h2 className="text-center mb-4">Your Cart</h2>
          {uniqueItems.length > 0 ? (
            <>
              <Row className="justify-content-center">
                {uniqueItems.map((product, index) => (
                  <Col md={4} key={index}>
                    <Card className="mb-4 product-card">
                      <Card.Img variant="top" src={product.imageUrl} alt={product.productName} />
                      <Card.Body className="product-card-body">
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>{product.productDescription}</Card.Text>
                        <Card.Text><strong>Price: ${product.productPrice.toFixed(2)}</strong></Card.Text>
                        <Card.Text><strong>Quantity: {product.quantity || 1}</strong></Card.Text>
                        <Button 
                          variant="primary" 
                          onClick={() => handleBuyNow(product)}
                          className={`buy-now-button ${selectedProducts.some(p => p.id === product.id) ? 'selected' : ''}`}
                        >
                          {selectedProducts.some(p => p.id === product.id) ? '✓ Selected' : 'Buy Now'}
                        </Button>
                        <Button 
                          variant="danger" 
                          onClick={() => removeFromCart(product.id)}
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
