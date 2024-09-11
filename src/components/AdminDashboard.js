import React, { useEffect, useState } from 'react';
import AdminHeader from './Adminheader';
import Footer from './Footer';
import UserProfile from './UserProfile';
import '../css/AdminDashboard.css';
import CheckoutService from '../context/CheckoutServices'; // Import CheckoutService to fetch checkouts
import FBDataService from '../context/FBService'; // Import FBDataService for user data
import { useUserAuth } from '../context/UserAuthContext'; // Import the useUserAuth hook

function AdminDashboard() {
    const [totalServerFees, setTotalServerFees] = useState(0);
    const [totalProductsSold, setTotalProductsSold] = useState(0);
    const { user } = useUserAuth(); // Get the logged-in user from the auth context
    const [userName, setUserName] = useState(''); // State to store the user's name

    useEffect(() => {
        const fetchCheckoutData = async () => {
            try {
                const querySnapshot = await CheckoutService.getAllCheckouts();
                
                let totalFees = 0;
                let totalProducts = 0;
                
                querySnapshot.docs.forEach(doc => {
                    const checkoutData = doc.data();
                    
                    // Sum up server fees
                    const serverFee = parseFloat(checkoutData.serverFee || 0);
                    totalFees += serverFee;

                    // Count total number of products sold
                    const itemsSold = checkoutData.items ? checkoutData.items.length : 0;
                    totalProducts += itemsSold;
                });

                setTotalServerFees(totalFees.toFixed(2)); // Set total server fees (formatted)
                setTotalProductsSold(totalProducts); // Set total number of products sold
            } catch (error) {
                console.error("Error fetching checkout data: ", error);
            }
        };

        const fetchUserName = async () => {
            try {
                if (user) {
                    const userDoc = await FBDataService.getData(user.uid); // Fetch user data using UID
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setUserName(userData.name); // Set the user's name
                    } else {
                        console.log("No such user!");
                    }
                }
            } catch (error) {
                console.error('Error fetching user data: ', error);
            }
        };

        fetchCheckoutData();
        fetchUserName(); // Fetch the user's name when the component mounts
    }, [user]); // Re-run when the user state changes

    return (
      <div className='main-content'>
        <AdminHeader/>
        {/* Display the user's name in the welcome message */}
        <h2 className='welcome-message'>Welcome to the Admin Dashboard, {userName}!</h2>
        <div className="content">
          <div className="user-profile"><UserProfile/></div>
          <div className="dashboard-summary">
            <h3 className='summary-box'>
              <p className="text">Total Server Fees </p>${totalServerFees}
            </h3>
            <h3 className='summary-box'>
              <p className="text">Total Products Sold </p>{totalProductsSold}
            </h3>
          </div>
        </div>
      </div>
    );
}
  
export default AdminDashboard;
