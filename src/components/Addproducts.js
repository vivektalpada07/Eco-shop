import React, { useState } from 'react';
import { db, auth } from '../firebase'; // Ensure Firebase Auth is imported
import { collection, addDoc, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';

function Addproducts() {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productDetailedDescription, setProductDetailedDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('furniture');
  const [images, setImages] = useState([]); // Updated to handle multiple images
  const [imageUrls, setImageUrls] = useState([]);
  const [progress, setProgress] = useState(0);
  const [successMessage, setSuccessMessage] = useState('');

  const storage = getStorage();

  const handleImageChange = (e) => {
    if (e.target.files) {
      setImages([...e.target.files]);
    }
  };

  const handleImageUpload = () => {
    if (images.length === 0) {
      alert("Please select images to upload.");
      return;
    }

    const uploadPromises = images.map((image) => {
      const storageRef = ref(storage, `images/${productName}/${image.name}`); // Save images in a sub-folder
      const uploadTask = uploadBytesResumable(storageRef, image);

      return new Promise((resolve, reject) => {
        uploadTask.on(
          'state_changed',
          (snapshot) => {
            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            setProgress(progress);
          },
          (error) => {
            console.error("Upload failed: ", error);
            reject(error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImageUrls((prev) => [...prev, downloadURL]);
              resolve(downloadURL);
            });
          }
        );
      });
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        console.log('All images uploaded:', urls);
        alert('Images uploaded successfully!');
      })
      .catch((error) => {
        console.error('Error uploading images: ', error);
        alert('Failed to upload images. Please try again.');
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const docRef = await addDoc(collection(db, "products"), {
        productName,
        productDescription,
        productDetailedDescription,
        productPrice: Number(productPrice),
        category,
        imageUrls, // Save the image URLs to Firestore
        sellerId: user.uid, // Include the seller ID in the product document
        sellerUsername: user.displayName || user.email.split('@')[0], // Save the seller's username
        sellerEmail: user.email, // Save the seller's email as well
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
      setImages([]);
      setImageUrls([]);
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
    <div className='main-content'>
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
          <label>Upload Images:</label>
          <input type="file" onChange={handleImageChange} multiple />
          <button type="button" onClick={handleImageUpload}>Upload Images</button>
          <progress value={progress} max="100" />
          {imageUrls.length > 0 && imageUrls.map((url, index) => (
            <img key={index} src={url} alt="Uploaded" style={{ width: '100px', marginTop: '10px' }} />
          ))}
        </div>
        <button type="submit">Add Product</button>
      </form>

      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
}

export default Addproducts;
