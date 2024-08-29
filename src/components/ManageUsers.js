import React, { useEffect, useState } from "react";
import FBDataService from "../context/FBService";
import { Table, Form } from "react-bootstrap";
import AdminHeader from "./Adminheader";
import Footer from "./Footer";

const ManageUsers = () => {
  const [customers, setCustomers] = useState([]);
  const [sellers, setSellers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const data = await FBDataService.getAllData();
      const users = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

      // Separate users into customers and sellers
      setCustomers(users.filter((user) => user.role === "customer"));
      setSellers(users.filter((user) => user.role === "seller"));
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async (id, newRole) => {
    try {
      const userToUpdate = customers.concat(sellers).find(user => user.id === id);
      if (userToUpdate) {
        await FBDataService.updateData(id, { ...userToUpdate, role: newRole });
        
        // Update the local state to reflect the role change
        if (newRole === "customer") {
          setCustomers(prevCustomers => [...prevCustomers, { ...userToUpdate, role: newRole }]);
          setSellers(prevSellers => prevSellers.filter(user => user.id !== id));
        } else if (newRole === "seller") {
          setSellers(prevSellers => [...prevSellers, { ...userToUpdate, role: newRole }]);
          setCustomers(prevCustomers => prevCustomers.filter(user => user.id !== id));
        }
      }
    } catch (err) {
      console.error("Error updating role:", err);
    }
  };

  return (
    <div className="manage-users-container">
      <AdminHeader/>
      <h2>Manage Users</h2>

      <h3>Customers</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <Form.Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="customer">Customer</option>
                  <option value="seller">Seller</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <h3>Sellers</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {sellers.map((user) => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.mobile}</td>
              <td>
                <Form.Select
                  value={user.role}
                  onChange={(e) => handleRoleChange(user.id, e.target.value)}
                >
                  <option value="seller">Seller</option>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </Form.Select>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Footer/>
    </div>
  );
};

export default ManageUsers;
