import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';

function Addproducts() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('furniture');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "products"), {
        productName,
        productDescription,
        productPrice: Number(productPrice),
        category,
      });
      console.log("Document written with ID: ", docRef.id);

      // Show success message
      setSuccessMessage('Product added successfully!');

      // Clear the form after submission
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setCategory('furniture'); // Reset to default category

      // Remove the success message after 3 seconds
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Description:</label>
          <input
            type="text"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Product Price:</label>
          <input
            type="number"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="furniture">Furnitures</option>
            <option value="electricalgoods">Electrical Goods</option>
            <option value="homewares">Homewares</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default Addproducts;
