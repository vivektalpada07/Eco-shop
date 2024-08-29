import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';  // Ensure Firebase Auth is imported
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Modal, Button } from 'react-bootstrap';
import Header from './Header';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';  
import { useWishlistContext } from '../context/Wishlistcontext';
import '../css/Furnitures.css';

function Furnitures() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const { addToCart } = useCartContext();  
  const { addToWishlist } = useWishlistContext();  
  const currentUser = auth.currentUser;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("category", "==", "furniture"));
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
    console.log("Selected Product:", product);  // Debugging statement
    setSelectedProduct(product);
    setShow(true);
  };

  const handleClose = () => setShow(false);

  const handleAddToCart = () => {
    if (!currentUser) {
      alert("Please log in to add items to the cart.");
      return;
    }

    if (selectedProduct) {
      console.log("Adding to cart:", selectedProduct);  // Debugging statement
      addToCart({ ...selectedProduct });
      handleClose();
    } else {
      console.error("No product selected or product data is incomplete.");
    }
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
                    <p className="card-text">Seller Username: {product.sellerUsername || "Unknown"}</p>  {/* Display Seller's Username */}
                    <button 
                      className="btn wishlist" 
                      onClick={() => addToWishlist(product)}
                    >
                      Add to Wishlist
                    </button>
                    <button 
                      className="btn add-to-cart ms-2" 
                      onClick={handleAddToCart}
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
              <p className="product-seller-username">Seller Username: {selectedProduct.sellerUsername || "Unknown"}</p>  {/* Display Seller's Username */}
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
