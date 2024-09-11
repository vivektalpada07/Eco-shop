import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';  
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Modal, Button, Carousel } from 'react-bootstrap';
import ReactImageMagnify from 'react-image-magnify';  // Allows users to zoom in on product images
import Header from './Header';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';  
import { useWishlistContext } from '../context/Wishlistcontext';
import '../css/Homewares.css';  // Custom styles for the Homewares page
import HeaderSwitcher from './HeaderSwitcher';

function Homewares() {
  // State hooks to manage products, filtered products, and similar products
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [show, setShow] = useState(false);
  const [sortOrder, setSortOrder] = useState('asc'); // Default sorting order
  const { cartItems, addToCart } = useCartContext();  
  const { addToWishlist } = useWishlistContext();  
  const currentUser = auth.currentUser;

  // Fetch products when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("category", "==", "homewares"));
        const querySnapshot = await getDocs(q);
        const productsArray = querySnapshot.docs.map(doc => ({
          productId: doc.id,
          ...doc.data()
        }));
        setProducts(productsArray);
        setFilteredProducts(productsArray); // Display all products initially
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Sort the filtered products whenever the sortOrder changes
  useEffect(() => {
    const sortedProducts = [...filteredProducts].sort((a, b) => {
      return sortOrder === 'asc' ? a.productPrice - b.productPrice : b.productPrice - a.productPrice;
    });
    setFilteredProducts(sortedProducts);
  }, [sortOrder]);

  // Handle search input and filter products based on the search term
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(value) ||
      product.productDescription.toLowerCase().includes(value) ||
      product.sellerUsername?.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered);
  };

  // Handle sorting options
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  // Show product details modal and fetch similar products
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
    fetchSimilarProducts(product.category);  // Get similar products based on category
  };

  const handleClose = () => setShow(false);

  // Add product to the cart if user is logged in
  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Please log in to add items to the cart.");
      return;
    }

    const isAlreadyInCart = cartItems.some(item => item.productId === product.productId);

    if (isAlreadyInCart) {
      alert("This product is already in your cart.");
    } else {
      addToCart({ ...product });
    }
  };

  // Add product to the wishlist if user is logged in
  const handleAddToWishlist = () => {
    if (!currentUser) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    if (selectedProduct) {
      addToWishlist({ ...selectedProduct });
      handleClose();
    } else {
      console.error("No product selected or product data is incomplete.");
    }
  };

  // Fetch similar products based on the category of the selected product
  const fetchSimilarProducts = async (category) => {
    try {
      const q = query(collection(db, "products"), where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map(doc => ({
        productId: doc.id,
        ...doc.data()
      }));
      setSimilarProducts(productsArray); // Update state with similar products
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  // Update modal with details of a clicked similar product
  const handleProductClick = (product) => {
    setSelectedProduct(product);
    fetchSimilarProducts(product.category);  // Refresh similar products list
  };

  return (
    <div className="wrapper">
      <HeaderSwitcher/>
      <div className="main-content" style={{marginTop: 80}}>
        <h2 className="text-center">Our Homewares Collection</h2>

        {/* Search Bar for filtering products */}
        <div className="search-bar text-center mb-4">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            style={{ maxWidth: '400px', margin: '0 auto' }}
          />
        </div>

        {/* Sort Dropdown for ordering products by price */}
        <div className="sort-dropdown text-center mb-4">
          <select
            value={sortOrder}
            onChange={handleSortChange}
            className="form-control"
            style={{ maxWidth: '200px', margin: '0 auto' }}
          >
            <option value="default">Sort by Price</option>
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {/* Display filtered products */}
        {filteredProducts.length > 0 ? (
          <div className="row justify-content-center">
            {filteredProducts.map((product, index) => (
              <div className="col-md-4" key={index}>
                <div className="card text-center">
                  <div className="card-body">
                    {product.imageUrls && product.imageUrls[0] && (
                      <img src={product.imageUrls[0]} alt={product.productName} style={{ width: '100%', height: 'auto' }} />
                    )}
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="card-text">{product.productDescription}</p>
                    <p className="card-text"><strong>Price: ${product.productPrice}</strong></p>
                    <p className="card-text">Seller Username: {product.sellerUsername || "Unknown"}</p>
                    <button 
                      className="btn add-to-cart mb-2" 
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                    <button 
                      className="btn view-details" 
                      style={{ backgroundColor: '#ff8c00' }} 
                      onClick={() => handleShow(product)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No homewares products found.</p>
        )}
      </div>
      <Footer />

      {/* Modal for displaying product details */}
      {selectedProduct && (
        <Modal show={show} onHide={handleClose} scrollable={true}> 
          <Modal.Header closeButton>
            <Modal.Title>{selectedProduct.productName}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ maxHeight: '500px', overflowY: 'auto' }}>
            {selectedProduct.imageUrls && selectedProduct.imageUrls.length > 0 && (
              <Carousel>
                {selectedProduct.imageUrls.map((url, index) => (
                  <Carousel.Item key={index}>
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: selectedProduct.productName,
                          isFluidWidth: true,
                          src: url
                        },
                        largeImage: {
                          src: url,
                          width: 1200,
                          height: 1200
                        },
                        enlargedImagePosition: "beside",
                        isHintEnabled: true
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            <div className="product-details">
              <p className="product-seller-username">Seller Username: {selectedProduct.sellerUsername || "Unknown"}</p>
              <p>{selectedProduct.productDescription}</p>
              <p className="product-description">{selectedProduct.productDetailedDescription}</p>
              <p className="product-price">Price: ${selectedProduct.productPrice}</p>
            </div>

            {/* Action buttons for the modal */}
            <div className="product-buttons">
              <Button variant="warning" className="mb-3" onClick={handleAddToWishlist}>
                Add to Wishlist
              </Button>
              <Button variant="primary" className="mb-3" onClick={() => handleAddToCart(selectedProduct)}>
                Add to Cart
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>

            {/* Display similar products */}
            {similarProducts.length > 0 && (
              <div className="similar-products mt-4">
                <h5>Similar Products</h5>
                <div className="row">
                  {similarProducts.map((product, index) => (
                    <div className="col-md-3" key={index} onClick={() => handleProductClick(product)}>
                      <div className="card">
                        <img src={product.imageUrls?.[0]} alt={product.productName} style={{ width: '100%' }} />
                        <div className="card-body">
                          <h6 className="card-title">{product.productName}</h6>
                          <p className="card-text">Price: ${product.productPrice}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Homewares;
