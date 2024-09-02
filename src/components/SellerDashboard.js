import React from 'react';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import SellerHeader from './SellerHeader';
import UserProfile from './UserProfile';

function SellerDashboard() {
    return (
      <div>
        <SellerHeader/>
          <h2>Welcome to the Admin Dashboard!</h2>
          <UserProfile/>
          {/* <h4>Add New <Link to="/addproduct">Products</Link></h4> */}
        <Footer/>
    </div>
    );
}
  
export default SellerDashboard;