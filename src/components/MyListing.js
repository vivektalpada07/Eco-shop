import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";
import { useProductcontext } from "../context/Productcontext";
import { useUserAuth } from "../context/UserAuthContext"; // Assuming you have an AuthContext to manage user login

const MyListings = () => {
  const { products } = useProductcontext();
  const { currentUser } = useUserAuth(); // Get the current logged-in user
  const [sellerProducts, setSellerProducts] = useState([]);

  useEffect(() => {
    if (currentUser) {
      const filteredProducts = products.filter(
        (product) => product.sellerId === currentUser.uid // Assuming each product has a sellerId field
      );
      setSellerProducts(filteredProducts);
    }
  }, [products, currentUser]);

  return (
    <div className="my-listings-container">
      <h2>My Listings</h2>
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
              <td>{product.category}</td>
              <td>
                {/* Add actions like Edit, Delete if needed */}
                <Button variant="warning">Edit</Button>{" "}
                <Button variant="danger">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default MyListings;
