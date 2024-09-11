import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import UserProfile from './UserProfile';
import CustomerHeader from './Customerheader';
import { useUserAuth } from '../context/UserAuthContext';
import FBDataService from '../context/FBService';
import '../css/Dashboard.css'
import CheckoutService from '../context/CheckoutServices'; // Import CheckoutService

function Dashboard() {
    const { user } = useUserAuth();
    const [purchasedProducts, setPurchasedProducts] = useState([]);
    const [userName, setUserName] = useState('');

    // Fetch purchased products and user name
    useEffect(() => {
      const fetchPurchasedProducts = async () => {
          if (user) {
              try {
                  const querySnapshot = await CheckoutService.getAllCheckouts();
                  console.log("QuerySnapshot:", querySnapshot.docs.map(doc => doc.data())); // Log all checkout documents
                  console.log("User ID:", user.uid); // Log the current user ID
  
                  const productsArray = querySnapshot.docs
                      .map(doc => ({
                          id: doc.id,
                          ...doc.data()
                      }))
                      .filter(checkout => checkout.userId === user.uid) // Filter checkouts by user ID
                      .flatMap(checkout => checkout.items); // Extract the `items` array from each checkout document
                  
                  console.log("Filtered Products Array:", productsArray); // Log the filtered products array
  
                  setPurchasedProducts(productsArray);
              } catch (error) {
                  console.error("Error fetching purchased products: ", error);
              }
          }
      };

      const fetchUserName = async () => {
          if (user) {
              try {
                  const userDoc = await FBDataService.getData(user.uid); // Fetch user data using UID
                  if (userDoc.exists()) {
                      const userData = userDoc.data();
                      setUserName(userData.name); // Set the user's name
                  } else {
                      console.log("No such user!");
                  }
              } catch (error) {
                  console.error('Error fetching user data: ', error);
              }
          }
      };

      fetchPurchasedProducts();
      fetchUserName(); // Fetch the user's name when the component mounts
  }, [user]);

    return (
        <div className='main-content'>
            <CustomerHeader />
            {/* Display the user's name in the welcome message */}
            <h2 className='welcome-message'>Welcome to the Dashboard, {userName}!</h2>
            <div className='user-profile'><UserProfile /></div>
            <div className='content'>
            {/* Display Purchased Products */}
            <div className="purchased-products">
                <h3 className='section-title'>Your Purchased Products</h3>
                {purchasedProducts.length > 0 ? (
                    <ul className='product-list'>
                        {purchasedProducts.map((product, index) => (
                            <li key={index} className='product-item'>
                                <h4 className='product-name'>{product.productName}</h4>
                                <p className='product-description'>{product.productDescription}</p>
                                <p className='product-price'>Price: ${product.productPrice}</p>
                                <div className='product-images'>
                                    {product.imageUrls && product.imageUrls.map((imageUrl, i) => (
                                        <img
                                            key={i}
                                            src={imageUrl}
                                            alt={product.productName}
                                            className='product-image'
                                        />
                                    ))}
                                </div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className='no-products'>You have not purchased any products yet.</p>
                )}
            </div>
            </div>
        </div>
    );
}

export default Dashboard;
