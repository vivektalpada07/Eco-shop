import React, { useEffect, useState } from 'react';
import { db, auth } from '../firebase';  
import { collection, getDocs, query, where } from 'firebase/firestore';
import { Modal, Button, Carousel } from 'react-bootstrap';
import ReactImageMagnify from 'react-image-magnify';
import HeaderSwitcher from './HeaderSwitcher';
import Footer from './Footer';
import { useCartContext } from '../context/Cartcontext';  
import { useWishlistContext } from '../context/Wishlistcontext';
import '../css/Electricalgoods.css';

function Electricalgoods() {
  const [products, setProducts] = useState([]); // State to hold all products
  const [filteredProducts, setFilteredProducts] = useState([]); // State to hold products after filtering and sorting
  const [similarProducts, setSimilarProducts] = useState([]); // State to hold similar products
  const [searchTerm, setSearchTerm] = useState(''); // State to hold the search input
  const [selectedProduct, setSelectedProduct] = useState(null); // State to hold the currently selected product for detail view
  const [show, setShow] = useState(false); // State to control the visibility of the product detail modal
  const [sortOrder, setSortOrder] = useState('asc'); // State to control the sorting order
  const { cartItems, addToCart } = useCartContext(); // Cart context for managing cart items
  const { addToWishlist } = useWishlistContext(); // Wishlist context for managing wishlist items
  const currentUser = auth.currentUser; // Get the currently authenticated user

  // Fetch products from Firestore when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(collection(db, "products"), where("category", "==", "electricalgoods"));
        const querySnapshot = await getDocs(q);
        const productsArray = querySnapshot.docs.map(doc => ({
          productId: doc.id,
          ...doc.data()
        }));
        setProducts(productsArray); // Set the fetched products to state
        setFilteredProducts(productsArray); // Initialize filtered products with all fetched products
      } catch (error) {
        console.error("Error fetching products:", error); // Log any errors
      }
    };

    fetchProducts();
  }, []);

  // Sort products based on the selected sort order
  useEffect(() => {
    const sortProducts = (products) => {
      return [...products].sort((a, b) => {
        return sortOrder === 'asc' 
          ? a.productPrice - b.productPrice 
          : b.productPrice - a.productPrice;
      });
    };
    setFilteredProducts(sortProducts(filteredProducts)); // Update filtered products after sorting
  }, [sortOrder]);

  // Handle search input and filter products accordingly
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);
    const filtered = products.filter(product =>
      product.productName.toLowerCase().includes(value) ||
      product.productDescription.toLowerCase().includes(value) ||
      product.sellerUsername?.toLowerCase().includes(value)
    );
    setFilteredProducts(filtered); // Update filtered products based on the search term
  };

  // Show the modal with product details and fetch similar products
  const handleShow = (product) => {
    setSelectedProduct(product);
    setShow(true);
    fetchSimilarProducts(product.category); // Fetch similar products based on the selected product's category
  };

  // Close the product detail modal
  const handleClose = () => setShow(false);

  // Add product to cart
  const handleAddToCart = (product) => {
    if (!currentUser) {
      alert("Please log in to add items to the cart."); // Prompt user to log in if not authenticated
      return;
    }

    const isAlreadyInCart = cartItems.some(item => item.productId === product.productId);

    if (isAlreadyInCart) {
      alert("This product is already in your cart."); // Alert if product is already in the cart
    } else {
      addToCart({ ...product }); // Add the product to the cart
    }
  };

  // Add selected product to wishlist
  const handleAddToWishlist = () => {
    if (!currentUser) {
      alert("Please log in to add items to your wishlist."); // Prompt user to log in if not authenticated
      return;
    }

    if (selectedProduct) {
      addToWishlist({ ...selectedProduct }); // Add the selected product to the wishlist
      handleClose(); // Close the modal after adding to wishlist
    } else {
      console.error("No product selected or product data is incomplete."); // Log error if no product is selected
    }
  };

  // Fetch similar products based on category
  const fetchSimilarProducts = async (category) => {
    try {
      const q = query(collection(db, "products"), where("category", "==", category));
      const querySnapshot = await getDocs(q);
      const productsArray = querySnapshot.docs.map(doc => ({
        productId: doc.id,
        ...doc.data()
      }));
      setSimilarProducts(productsArray); // Update similar products state
    } catch (error) {
      console.error("Error fetching similar products:", error); // Log any errors
    }
  };

  // Handle changes in sort order
  const handleSortChange = (event) => {
    setSortOrder(event.target.value); // Update sort order state
  };

  return (
    <div className="wrapper">
      <HeaderSwitcher /> {/* Render the header switcher component */}
      <div className="main-content" style={{marginTop: 80}}>
        <h2 className="text-center">Our Electrical Goods Collection</h2>

        {/* Search Bar */}
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

        {/* Sort Dropdown */}
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

        {filteredProducts.length > 0 ? (
          <div className="row justify-content-center">
            {filteredProducts.map((product) => (
              <div className="col-md-4" key={product.productId}>
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
          <p>No electrical goods products found.</p>
        )}
      </div>
      <Footer /> {/* Render the footer component */}

      {/* Modal for Product Details */}
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
              <p className="product-description">{selectedProduct.productDescription}</p>
              <p><strong>Price: ${selectedProduct.productPrice}</strong></p>
            </div>
            <Button variant="primary" onClick={handleAddToCart(selectedProduct)}>Add to Cart</Button>
            <Button variant="secondary" onClick={handleAddToWishlist}>Add to Wishlist</Button>
          </Modal.Body>
        </Modal>
      )}
    </div>
  );
}

export default Electricalgoods;
