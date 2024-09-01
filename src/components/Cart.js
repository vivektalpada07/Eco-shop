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
import '../css/Cart.css';
import '../App.css';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const { cartItems, removeFromCart } = useCartContext();
  const { user: currentUser } = useUserAuth();
  const [selectedProductIds, setSelectedProductIds] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const selectedProducts = cartItems.filter(p => selectedProductIds.includes(p.productId));
    const total = selectedProducts.reduce((sum, product) => sum + product.productPrice, 0);
    setTotalPrice(total);
  }, [selectedProductIds, cartItems]);

  const handleBuyNow = (productId) => {
    setSelectedProductIds(prevSelected => {
      if (prevSelected.includes(productId)) {
        return prevSelected.filter(id => id !== productId);
      } else {
        return [...prevSelected, productId];
      }
    });
  };

  const handleCheckout = () => {
    if (!currentUser) {
      alert("You need to log in to proceed to checkout.");
      return;
    }
    if (selectedProductIds.length === 0) {
      alert("Please select at least one product to proceed.");
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
                {cartItems.map((product) => (
                  <Col md={4} key={product.productId}>
                    <Card className="mb-4 product-card">
                      <Card.Img variant="top" src={product.imageUrl} alt={product.productName} />
                      <Card.Body className="product-card-body">
                        <Card.Title>{product.productName}</Card.Title>
                        <Card.Text>{product.productDescription}</Card.Text>
                        <Card.Text><strong>Price: ${product.productPrice.toFixed(2)}</strong></Card.Text>
                        <Card.Text>Seller: {product.sellerUsername}</Card.Text>
                        <Button 
                          variant={selectedProductIds.includes(product.productId) ? "success" : "primary"}
                          onClick={() => handleBuyNow(product.productId)}
                          className={`buy-now-button ${selectedProductIds.includes(product.productId) ? 'selected' : ''}`}
                        >
                          {selectedProductIds.includes(product.productId) ? '✓ Selected' : 'Buy Now'}
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
                  <h3>Total Price for Selected Products: ${totalPrice.toFixed(2)}</h3>
                </div>
              )}
              <div className="text-center mt-3">
                <Button 
                  variant="success" 
                  size="lg" 
                  className="checkout-button"
                  onClick={handleCheckout}
                  disabled={selectedProductIds.length === 0}
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
