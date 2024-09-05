import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import SellerHeader from './SellerHeader';
import UserProfile from './UserProfile';

function SellerDashboard() {
    return (
      <div className="main-content">
        <SellerHeader/>
          <h2>Welcome {UserProfile.username} to the Seller Dashboard!</h2>
          <UserProfile/>
          {/* <h4>Add New <Link to="/addproduct">Products</Link></h4> */}
    </div>
    );
}
  
export default SellerDashboard;