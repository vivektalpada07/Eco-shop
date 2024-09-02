import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useProductcontext } from "../context/Productcontext";
import { useUserAuth } from "../context/UserAuthContext";
import SellerHeader from "./SellerHeader";
import AdminHeader from "./Adminheader";
import Footer from "./Footer";
import FBDataService from "../context/FBService"; // Import your service to interact with the database

const MyListings = () => {
  const { products } = useProductcontext();
  const { user, role } = useUserAuth();
  const [sellerProducts, setSellerProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    if (user && products.length > 0) {
      const filteredProducts = products.filter(
        (product) => product.sellerId === user.uid
      );
      setSellerProducts(filteredProducts);
    }
  }, [products, user]);

  const handleEditClick = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleDeleteClick = async (productId) => {
    try {
      await FBDataService.deleteData(productId); // Use your service to delete the product from the database
      setSellerProducts(sellerProducts.filter((product) => product.id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await FBDataService.updateData(currentProduct.id, currentProduct); // Update the product in the database
      setSellerProducts(sellerProducts.map((product) =>
        product.id === currentProduct.id ? currentProduct : product
      ));
      setShowModal(false);
    } catch (err) {
      console.error("Error updating product:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  return (
    <div className="my-listings-container">
      {role === "admin" && <AdminHeader />}
      {role === "seller" && <SellerHeader />}

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
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            {sellerProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.productName}</td>
                <td>{product.productPrice}</td>
                <td>{product.productDescription}</td>
                <td>{product.category}</td>
                <td>{product.sellerUsername}</td>
                <td>
                  <Button
                    variant="warning"
                    onClick={() => handleEditClick(product)}
                  >
                    Edit
                  </Button>{" "}
                  <Button
                    variant="danger"
                    onClick={() => handleDeleteClick(product.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>No products found for this seller.</p>
      )}

      {/* Modal for Editing Product */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  type="text"
                  name="productName"
                  value={currentProduct.productName}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="text"
                  name="productPrice"
                  value={currentProduct.productPrice}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="productDescription"
                  value={currentProduct.productDescription}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  name="productCategory"
                  value={currentProduct.category}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formSellerUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  name="Username"
                  value={currentProduct.sellerUsername}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Footer />
    </div>
  );
};

export default MyListings;
