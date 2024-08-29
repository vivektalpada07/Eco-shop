import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';  
import { useWishlistContext } from '../context/Wishlistcontext';

function Furnitures() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const { addToCart } = useCartContext();  
  const { addToWishlist } = useWishlistContext();  

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("category", "==", "furniture"));
      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map(doc => doc.data());
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleAddToCart = () => {
    addToCart(selectedProduct);
    handleClose();
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <h2 className="text-center">Our Furniture Collection</h2>

        {products.length > 0 ? (
          <div className="row justify-content-center">
            {products.map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className="card text-center" onClick={() => handleShow(product)}>
                  <div className="card-body">
                    {product.imageUrl && <img src={product.imageUrl} alt={product.productName} style={{ width: '100%', height: 'auto' }} />}
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDescription}</p>
                    <p className="card-text"><strong>Price: ${product.productPrice}</strong></p>
                    <button 
                      className="btn wishlist" 
                      onClick={() => addToWishlist(product)}
                    >
                      Add to Wishlist
                    </button>
                    <button 
                      className="btn add-to-cart ms-2" 
                      onClick={() => addToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No furniture products found.</p>
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
            {selectedProduct.imageUrl && <img src={selectedProduct.imageUrl} alt={selectedProduct.productName} />}
            <div className="product-details">
              <p>{selectedProduct.productDescription}</p>
              <p className="product-price">Price: ${selectedProduct.productPrice}</p>
              <p className="product-description">{selectedProduct.productDetailedDescription}</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default Furnitures;
