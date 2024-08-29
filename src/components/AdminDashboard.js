import React from 'react';
import AdminHeader from './Adminheader';
import Footer from './Footer';
// import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
      <div>
        <AdminHeader/>
          <h2>Welcome to the Admin Dashboard!</h2>
      
        <Footer/>
    </div>
    );
}
  
export default AdminDashboard;