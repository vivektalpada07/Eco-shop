import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';  
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';  
import { useWishlistContext } from '../context/Wishlistcontext';
import '../css/Homewares.css';

function Homewares() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const { addToCart } = useCartContext();  
  const { addToWishlist } = useWishlistContext();  
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("category", "==", "homewares"));
        const querySnapshot = await getDocs(q);
        const productsArray = querySnapshot.docs.map(doc => ({
          productId: doc.id,  // Assuming Firestore document ID is used as product ID
          ...doc.data()
        }));
        setProducts(productsArray);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Please log in to add items to the cart.");
      return;
    }

    addToCart({ ...product });
  };

  const handleAddToWishlist = () => {
    if (!currentUser) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    if (selectedProduct) {
      addToWishlist({ ...selectedProduct });
      handleClose();
    } else {
      console.error("No product selected or product data is incomplete.");
    }
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <h2 className="text-center">Our Homewares Collection</h2>

        {products.length > 0 ? (
          <div className="row justify-content-center">
            {products.map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className="card text-center">
                  <div className="card-body">
                    {product.imageUrl && <img src={product.imageUrl} alt={product.productName} style={{ width: '100%', height: 'auto' }} />}
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDescription}</p>
                    <p className="card-text"><strong>Price: ${product.productPrice}</strong></p>
                    <p className="card-text">Seller Username: {product.sellerUsername || "Unknown"}</p>
                    <button 
                      className="btn add-to-cart mb-2" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="btn wishlist" 
                      onClick={() => handleShow(product)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No homewares products found.</p>
        )}
      </div>
      <Footer />

      {/* Modal for Product Details */}
      {selectedProduct && (
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.productName}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedProduct.imageUrl && <img src={selectedProduct.imageUrl} alt={selectedProduct.productName} style={{ width: '100%' }} />}
            <div className="product-details">
              <p>{selectedProduct.productDescription}</p>
              <p className="product-price">Price: ${selectedProduct.productPrice}</p>
              <p className="product-description">{selectedProduct.productDetailedDescription}</p>
              <p className="product-seller-username">Seller Username: {selectedProduct.sellerUsername || "Unknown"}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="warning" onClick={handleAddToWishlist}>
              Add to Wishlist
            </Button>
            <Button variant="primary" onClick={() => handleAddToCart(selectedProduct)}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Homewares;
