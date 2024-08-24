import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from './Header';
import Footer from './Footer';

function Electricalgoods() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("category", "==", "electricalgoods"));
      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map(doc => doc.data());
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  const handleBuyNow = (product) => {
    console.log("Buying product:", product);
    // Implement the logic for buying the product here
  };

  const handleAddToCart = (product) => {
    console.log("Adding product to cart:", product);
    // Implement the logic for adding the product to the cart here
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <h2 className="text-center">Our Electrical Goods Collection</h2>
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
                      className="btn btn-primary" 
                      onClick={() => handleBuyNow(product)}
                    >
                      Buy Now
                    </button>
                    <button 
                      className="btn btn-secondary ms-2" 
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
          <p>No electrical goods products found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Electricalgoods;
