import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import Header from './Header';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';
import { useWishlistContext } from '../context/Wishlistcontext';

function Electricalgoods() {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState('');
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState("");
  const [progress, setProgress] = useState(0);
  const { addToCart } = useCartContext();
  const { addToWishlist } = useWishlistContext();

  const storage = getStorage();

  useEffect(() => {
    const fetchProducts = async () => {
      const q = query(collection(db, "products"), where("category", "==", "electricalgoods"));
      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map(doc => doc.data());
      setProducts(productsArray);
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.productName} has been added to your cart.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setMessage(`${product.productName} has been added to your wishlist.`);
    setTimeout(() => setMessage(''), 3000);
  };

  const handleChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
    }
  };

  const handleUpload = () => {
    if (!image) return;

    const storageRef = ref(storage, `images/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setUrl(downloadURL);
        });
      }
    );
  };

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <h2 className="text-center">Our Electrical Goods Collection</h2>
        {message && <p className="text-center alert alert-success">{message}</p>}

        {/* Image Upload Section */}
        <div className="image-upload">
          <progress value={progress} max="100" />
          <br />
          <input type="file" onChange={handleChange} />
          <button onClick={handleUpload}>Upload Image</button>
          <br />
          {url && <img src={url} alt="Uploaded" style={{ width: '300px' }} />}
        </div>

        {/* Products Display */}
        {products.length > 0 ? (
          <div className="row justify-content-center">
            {products.map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className="card text-center">
                  <div className="card-body">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDescription}</p>
                    <p className="card-text"><strong>Price: ${product.productPrice}</strong></p>
                    <button
                      className="btn wishlist"
                      onClick={() => handleAddToWishlist(product)}
                    >
                      Add to Wishlist
                    </button>
                    <button
                      className="btn add-to-cart ms-2"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No electrical goods products found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Electricalgoods;
