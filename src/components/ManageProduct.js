import React, { useEffect, useState } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useProductcontext } from "../context/Productcontext";
import AdminHeader from "./Adminheader";
import Footer from "./Footer";

const ManageProducts = () => {
  const { products, deleteProduct, updateProduct } = useProductcontext();
  const [productList, setProductList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [categories] = useState(["Electronics", "Fashion", "Books", "Home"]); // Example categories

  useEffect(() => {
    // Update the local state with products from the context
    setProductList(products);
  }, [products]);

  const handleDelete = (productId) => {
    deleteProduct(productId);
  };

  const handleEdit = (product) => {
    setCurrentProduct(product);
    setShowModal(true);
  };

  const handleSave = () => {
    // Save the updated product
    updateProduct(currentProduct.id, currentProduct);
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  return (
    <div className="main-content">
      <AdminHeader />
      <h2>Manage Products</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Description</th>
            <th>Seller</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productList.map((product) => (
            <tr key={product.id}>
              <td>{product.productName}</td>
              <td>{product.productPrice}</td>
              <td>{product.productDescription}</td>
              <td>{product.sellerUsername}</td>
              <td>
                <Button variant="warning" onClick={() => handleEdit(product)}>
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDelete(product.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentProduct && (
            <Form>
              <Form.Group controlId="formProductName">
                <Form.Label>Name</Form.Label>
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
                  type="number"
                  name="productPrice"
                  value={currentProduct.productPrice}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  name="productDescription"
                  value={currentProduct.productDescription}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="formProductCategory">
                <Form.Label>Category</Form.Label>
                <Form.Select
                  name="category"
                  value={currentProduct.category}
                  onChange={handleChange}
                >
                  {categories.map((category, index) => (
                    <option key={index} value={category}>
                      {category}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <Footer />
    </div>
  );
};

export default ManageProducts;
