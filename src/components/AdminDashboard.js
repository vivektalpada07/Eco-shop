import React from 'react';
import AdminHeader from './Adminheader';
import Footer from './Footer';
import UserProfile from './UserProfile';
// import { Link } from 'react-router-dom';

function AdminDashboard() {
    return (
      <div className='main-content'>
        <AdminHeader/>
          <h2 >Welcome to the Admin Dashboard!</h2>
        <UserProfile/>
    </div>
    );
}
  
export default AdminDashboard;