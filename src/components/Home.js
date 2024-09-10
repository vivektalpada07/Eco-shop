import React, { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Carousel from 'react-bootstrap/Carousel';  // Import Carousel
import Header from './Header';  
import Footer from './Footer';  
import { useProductcontext } from '../context/Productcontext'; // Import the ProductContext
import Slider from 'react-slick'; // Import Slick Carousel
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../css/Home.css';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';

function Home() {
  const { products } = useProductcontext(); // Get all products from context
  const [trendingProducts, setTrendingProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [image, setImage] = useState("");

  // Initialize Firebase Storage
  const storage = getStorage();

  useEffect(() => {
    if (products.length > 0) {
      const shuffled = [...products].sort(() => 0.5 - Math.random()); // Shuffle products
      setTrendingProducts(shuffled.slice(0, 3)); // Select the first 3 products as trending
    }
  }, [products]);

  useEffect(() => {
    // Fetch image URL from Firebase Storage
    const fetchImage = async () => {
      try {
        // Create a reference to the file in Firebase Storage
        const imageRef = ref(storage, "images/EcoShop.png"); // Provide the correct path

        // Get the download URL
        const url = await getDownloadURL(imageRef);

        // Set the image URL to state
        setImage(url);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, []);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1, // Show one slide at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="wrapper">
      <Header />
      <Container className='Home'>
        <Row className="align-items-center mt-5">
          <div className="image-section">
            {/* Display the fetched image */}
            {image ? (
              <img src={image} alt="EcoShop" className="image" />
            ): (
              <p>Loading Image...</p>
            )}
          </div>
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
          {trendingProducts.map(product => (
            <Col key={product.id} md={4} className="mb-4">
              <div className="card text-center">
                <Slider {...sliderSettings}>
                  {product.imageUrls && product.imageUrls.map((url, index) => (
                    <div key={index}>
                      <img 
                        src={url} 
                        alt={product.productName} 
                        className="card-img-top" 
                        style={{
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '5px'
                        }}
                      />
                    </div>
                  ))}
                </Slider>
                <div className="card-body">
                <p className="card-text"><strong>Price: ${product.productPrice}</strong></p>
                  <h5 className="card-title mt-3">{product.productName}</h5>
                 <p className="card-text">{product.productDescription}</p>
                 
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
