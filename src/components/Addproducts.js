import React, { useState } from 'react';
import { db } from '../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function Addproducts() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productDetailedDescription, setProductDetailedDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('furniture');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const storage = getStorage();

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleImageUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgress(progress);
      },
      (error) => {
        console.error("Image upload failed: ", error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "products"), {
        productName,
        productDescription,
        productDetailedDescription,
        productPrice: Number(productPrice),
        category,
        imageUrl, // Save the image URL to Firestore
      });
      console.log("Document written with ID: ", docRef.id);

      // Show success message
      setSuccessMessage('Product added successfully!');

      // Clear the form after submission
      setProductName('');
      setProductDescription('');
      setProductDetailedDescription('');
      setProductPrice('');
      setCategory('furniture');
      setImage(null);
      setImageUrl('');
      setProgress(0);

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
          <label>Detailed Description:</label>
          <textarea
            value={productDetailedDescription}
            onChange={(e) => setProductDetailedDescription(e.target.value)}
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
        <div>
          <label>Upload Image:</label>
          <input type="file" onChange={handleImageChange} />
          <button type="button" onClick={handleImageUpload}>Upload Image</button>
          <progress value={progress} max="100" />
          {imageUrl && <img src={imageUrl} alt="Uploaded" style={{ width: '100px', marginTop: '10px' }} />}
        </div>
        <button type="submit">Add Product</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default Addproducts;
