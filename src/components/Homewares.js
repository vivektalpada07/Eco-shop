import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from './Header';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';  
import { useWishlistContext } from '../context/Wishlistcontext'; 
import { getStorage } from 'firebase/storage';

function Homewares() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');  // State to hold the success message
  const { addToCart } = useCartContext();  
  const { addToWishlist } = useWishlistContext();  

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("category", "==", "homewares"));
      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map(doc => doc.data());
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);  
    setMessage(`${product.productName} has been added to your cart.`);
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);  
    setMessage(`${product.productName} has been added to your wishlist.`);
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <h2 className="text-center">Our Homewares Collection</h2>
        {message && <p className="text-center alert alert-success">{message}</p>}  {/* Display success message */}
        {products.length > 0 ? (
          <div className="row justify-content-center">
            {products.map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDescription}</p>
                    <p className="card-text"><strong>Price: ${product.productPrice}</strong></p>
                    <button 
                      className="btn wishlist" 
                      onClick={() => handleAddToWishlist(product)}
                    >
                      Add to Wishlist
                    </button>
                    <button 
                      className="btn add-to-cart ms-2" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
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
    </div>
  );
}

export default Homewares;
