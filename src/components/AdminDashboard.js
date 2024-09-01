import React from 'react';
import AdminHeader from './Adminheader';
import Footer from './Footer';
import UserProfile from './UserProfile';
// import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
      <div>
        <AdminHeader/>
          <h2 className='main-content'>Welcome to the Admin Dashboard!</h2>
        <UserProfile/>
        <Footer/>
    </div>
    );
}
  
export default AdminDashboard;