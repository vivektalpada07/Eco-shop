import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import CustomerHeader from './Customerheader';

function Dashboard() {
    return (
      <div>
        <CustomerHeader/>
          <h2>Welcome to the Dashboard!</h2>
          <UserProfile/>
        <Footer/>
    </div>
    );
}
  
export default Dashboard;