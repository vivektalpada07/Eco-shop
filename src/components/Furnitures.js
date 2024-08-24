import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import Header from './Header';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';

function Furnitures() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCartContext();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("category", "==", "furniture"));
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
    addToCart(product);  // Call the addToCart function to add the product to the cart
    console.log("Adding product to cart:", product);
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
          <p>No furniture products found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Furnitures;
