import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import UserProfile from './UserProfile';
import CustomerHeader from './Customerheader';
import { useUserAuth } from '../context/UserAuthContext';
import FBDataService from '../context/FBService';
import '../css/Dashboard.css'

function Dashboard() {
    const { user } = useUserAuth();
    const [userName, setUserName] = useState('');

    // Fetch user name
    useEffect(() => {
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

      fetchUserName(); // Fetch the user's name when the component mounts
  }, [user]);

    return (
        <div className='main-content'>
            <CustomerHeader />
            {/* Display the user's name in the welcome message */}
            <h2 className='welcome-message'>Welcome to the Dashboard, {userName}!</h2>
            <div className='user-profile'><UserProfile /></div>
        </div>
    );
}

export default Dashboard;
