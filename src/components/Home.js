import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';
import Header from './Header';  
import Footer from './Footer';  
import { useProductcontext } from '../context/Productcontext'; // Import the ProductContext
import '../css/Home.css';

function Home() {
  const { products } = useProductcontext(); // Get all products from context
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random()); // Shuffle products
      setTrendingProducts(shuffled.slice(0, 3)); // Select the first 3 products as trending
    }
  }, [products]);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  return (
    <div className="wrapper">
      <Header />
      <Container className='Home'>
        <Row className="align-items-center mt-5">
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
          <Row>
            {trendingProducts.map(product => (
              <Col md={4} key={product.id} className="mb-4">
                <div className="card text-center">
                  <div className="card-body">
                    {product.imageUrls && product.imageUrls.length > 0 && (
                      <img 
                        src={product.imageUrls[0]} 
                        alt={product.productName} 
                        className="card-img-top" 
                        style={{
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '5px'
                        }}
                      />
                    )}
                    <h5 className="card-title mt-3">{product.productName}</h5>
                    <p className="card-text">{product.productDescription}</p>
                    <p className="card-text"><strong>Price: ${product.productPrice}</strong></p>
                    <Button 
                      variant="warning"
                      onClick={() => handleShow(product)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Row>
      </Container>
      <Footer />

      {/* Modal for Product Details */}
      {selectedProduct && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.productName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct.imageUrls && selectedProduct.imageUrls.length > 0 && (
              <Carousel>
                {selectedProduct.imageUrls.map((url, index) => (
                  <Carousel.Item key={index}>
                    <img 
                      className="d-block w-100"
                      src={url} 
                      alt={`Product ${index + 1}`} 
                      style={{
                        height: '300px', 
                        objectFit: 'cover', 
                        borderRadius: '5px' 
                      }} 
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            <p>{selectedProduct.productDescription}</p>
            <p className="product-price">Price: ${selectedProduct.productPrice}</p>
            <p className="product-description">{selectedProduct.productDetailedDescription}</p>
            <p className="product-seller-username">Seller Username: {selectedProduct.sellerUsername || "Unknown"}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="warning" onClick={() => console.log("Add to Wishlist clicked!")}>
              Add to Wishlist
            </Button>
            <Button variant="primary" onClick={() => console.log("Add to Cart clicked!")}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Home;
