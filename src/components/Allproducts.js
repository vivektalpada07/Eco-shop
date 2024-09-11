import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Modal, Button, Carousel } from 'react-bootstrap';
import ReactImageMagnify from 'react-image-magnify';
import HeaderSwitcher from './HeaderSwitcher';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';
import { useWishlistContext } from '../context/Wishlistcontext';
import '../css/Furnitures.css';  // Using shared CSS for consistent look and feel

function AllProducts() {
  // State variables for handling product data, search, modal, and sorting
  const [products, setProducts] = useState([]);  // List of all products
  const [filteredProducts, setFilteredProducts] = useState([]);  // Products after search/filter
  const [similarProducts, setSimilarProducts] = useState([]);  // List of products similar to the selected one
  const [searchTerm, setSearchTerm] = useState('');  // Stores search input
  const [selectedProduct, setSelectedProduct] = useState(null);  // Tracks the currently selected product
  const [show, setShow] = useState(false);  // Controls the product details modal visibility
  const [sortOption, setSortOption] = useState('default');  // Tracks the current sorting option

  // Access to cart and wishlist functions from their respective contexts
  const { cartItems, addToCart } = useCartContext();
  const { addToWishlist } = useWishlistContext();
  const currentUser = auth.currentUser;  // Current authenticated user

  // Fetch all products from the Firestore database on component load
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productsArray = querySnapshot.docs.map(doc => ({
          productId: doc.id,
          ...doc.data()
        }));
        setProducts(productsArray);
        setFilteredProducts(productsArray);  // Initially set filtered products as all products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Sort products when the selected sorting option changes
  useEffect(() => {
    let sortedProducts = [...filteredProducts];  // Copy the filtered products list

    // Sorting logic for different options
    if (sortOption === 'priceLowToHigh') {
      sortedProducts.sort((a, b) => a.productPrice - b.productPrice);  // Ascending order by price
    } else if (sortOption === 'priceHighToLow') {
      sortedProducts.sort((a, b) => b.productPrice - a.productPrice);  // Descending order by price
    }

    setFilteredProducts(sortedProducts);  // Update the state with sorted products
  }, [sortOption]);

  // Handle the search input and filter the product list based on the search term
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();  // Convert input to lowercase for case-insensitive search
    setSearchTerm(value);  // Update search term
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(value) ||
      product.productDescription.toLowerCase().includes(value) ||
      product.sellerUsername?.toLowerCase().includes(value)  // Check if search term matches name, description, or seller
    );
    setFilteredProducts(filtered);  // Update the filtered products based on search
  };

  // Handle change in sorting option from the dropdown
  const handleSortChange = (event) => {
    setSortOption(event.target.value);  // Update sorting option
  };

  // Open the product details modal and fetch similar products based on the category
  const handleShow = (product) => {
    setSelectedProduct(product);  // Set the currently selected product
    setShow(true);  // Show the modal
    fetchSimilarProducts(product.category);  // Fetch products in the same category
  };

  // Close the product details modal
  const handleClose = () => setShow(false);

  // Add the product to the cart, ensuring the user is logged in and the product is not already in the cart
  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Please log in to add items to the cart.");
      return;
    }

    // Check if the product is already in the cart
    const isAlreadyInCart = cartItems.some(item => item.productId === product.productId);

    if (isAlreadyInCart) {
      alert("This product is already in your cart.");
    } else {
      addToCart({ ...product });  // Add product to cart
    }
  };

  // Add the selected product to the wishlist, ensuring the user is logged in
  const handleAddToWishlist = () => {
    if (!currentUser) {
      alert("Please log in to add items to your wishlist.");
      return;
    }

    if (selectedProduct) {
      addToWishlist({ ...selectedProduct });  // Add product to wishlist
      handleClose();  // Close the modal after adding
    } else {
      console.error("No product selected or product data is incomplete.");
    }
  };

  // Fetch products in the same category as the selected product for recommendations
  const fetchSimilarProducts = async (category) => {
    try {
      const q = query(collection(db, "products"), where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map(doc => ({
        productId: doc.id,
        ...doc.data()
      }));
      setSimilarProducts(productsArray);  // Update similar products state
    } catch (error) {
      console.error("Error fetching similar products:", error);
    }
  };

  return (
    <div className="wrapper">
      <HeaderSwitcher />  {/* Component that switches between headers based on the user role */}
      <div className="main-content" style={{marginTop: 80}}>
        <h2 className="text-center">All Products</h2>

        {/* Search Bar for filtering products */}
        <div className="search-bar text-center mb-4">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchTerm}
            onChange={handleSearch}
            className="form-control"
            style={{ maxWidth: '400px', margin: '0 auto' }}  // Center the search input
          />
        </div>

        {/* Dropdown for sorting products */}
        <div className="sort-options text-center mb-4">
          <select value={sortOption} onChange={handleSortChange} className="form-control" style={{ maxWidth: '200px', margin: '0 auto' }}>
            <option value="default">Sort by Price</option>
            <option value="priceLowToHigh">Price: Low to High</option>
            <option value="priceHighToLow">Price: High to Low</option>
          </select>
        </div>

        {/* Display filtered products in a grid */}
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
                    <p className="card-text"><strong>Price: ${product.productPrice}</strong></p>
                    <p className="card-text">{product.productDescription}</p>
                    <p className="card-text">Seller Username: {product.sellerUsername || "Unknown"}</p>
                    <button className="btn add-to-cart mb-2" onClick={() => handleAddToCart(product)}>
                      Add to Cart
                    </button>
                    <button className="btn view-details" style={{ backgroundColor: '#ff8c00' }} onClick={() => handleShow(product)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
      <Footer />  {/* Footer component to display at the bottom */}

      {/* Modal for displaying selected product details */}
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
                        }
                      }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>
            )}
            <p>{selectedProduct.productDescription}</p>
            <p><strong>Price:</strong> ${selectedProduct.productPrice}</p>
            <p><strong>Category:</strong> {selectedProduct.category}</p>

            {/* Display similar products */}
            <div className="similar-products">
              <h5>Similar Products</h5>
              {similarProducts.length > 0 ? (
                <ul>
                  {similarProducts.map((similarProduct, index) => (
                    <li key={index}>{similarProduct.productName}</li>
                  ))}
                </ul>
              ) : (
                <p>No similar products found.</p>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
            <Button variant="primary" onClick={handleAddToWishlist}>Add to Wishlist</Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}

export default AllProducts;
