import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';

function Dashboard() {
    return (
      <div>
        <Header/>
          <h2>Welcome to the Dashboard!</h2>
          <UserProfile/>
          <h4>Add New <Link to="/addproduct">Products</Link></h4>
        <Footer/>
    </div>
    );
}
  
export default Dashboard;