import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
      <div>
        <Header/>
          <h2>Welcome to the Admin Dashboard!</h2>
      
          <h4>Add New <Link to="/addproduct">Products</Link></h4>
        <Footer/>
    </div>
    );
}
  
export default AdminDashboard;