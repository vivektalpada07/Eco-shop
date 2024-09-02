import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useProductcontext } from "../context/Productcontext";
import { useUserAuth } from "../context/UserAuthContext";
import SellerHeader from "./SellerHeader";
import AdminHeader from "./Adminheader";
import Footer from "./Footer";

const MyListings = () => {
  const { products } = useProductcontext();
  const { user, role } = useUserAuth(); // Get user and role from context
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => {
    console.log("Products: ", products);
    console.log("Current User: ", user);

    if (user && products.length > 0) {
      const filteredProducts = products.filter(
        (product) => product.sellerId === user.uid
      );
      console.log("Filtered Products: ", filteredProducts);
      setSellerProducts(filteredProducts);
    }
  }, [products, user]);

  return (
    <div className="my-listings-container">
      {role === "admin" && <AdminHeader />} {/* Render AdminHeader if role is admin */}
      {role === "seller" && <SellerHeader />} {/* Render SellerHeader if role is seller */}
      
      <h2>My Listings</h2>
      {sellerProducts.length > 0 ? (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {sellerProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productDescription}</td>
                <td>{product.productCategory}</td>
                <td>
                  <Button variant="warning">Edit</Button>{" "}
                  <Button variant="danger">Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No products found for this seller.</p>
      )}
      <Footer />
    </div>
  );
};

export default MyListings;
