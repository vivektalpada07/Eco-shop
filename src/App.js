import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import AdminDashboard from "./components/AdminDashboard";
import Furnitures from './components/Furnitures';
import Homewares from './components/Homewares';
import Cart from './components/Cart';
import Wishlist from './components/Wishlist';
import Electricalgoods from './components/Electricalgoods';
import { UserAuthContextProvider } from "./context/UserAuthContext";  
import { ProductContextProvider } from "./context/Productcontext";
import { CartContextProvider } from "./context/Cartcontext";
import { WishlistContextProvider } from './context/Wishlistcontext';
import AboutUs from './components/AboutUs';
import ReturnAndRefundPolicy from './components/ReturnRefundPolicy';
import ContactUs from './components/ContactUs';
import Addproducts from './components/Addproducts';
import ProtectedRoute, { AdminRoute, SellerRoute, CustomerRoute } from "./components/ProtectedRoute";
import Checkout from './components/Checkout';
import ManageUsers from './components/ManageUsers';
import SellerDashboard from './components/SellerDashboard';
import ManageProducts from './components/ManageProduct';
import MyListings from './components/MyListing';
function App() {
  return (
    <UserAuthContextProvider>
      <ProductContextProvider>
        <CartContextProvider>
          <WishlistContextProvider>
        <Container>
          <Row>
            <Col>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/aboutus" element={<AboutUs />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/customer" element={<CustomerRoute><Dashboard /></CustomerRoute>} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/Furnitures" element={<Furnitures/>} />
                <Route path="/Homewares" element={<Homewares/>} />
                <Route path="/Electricalgoods" element={<Electricalgoods/>} />
                <Route path="/Cart" element={<Cart/>} />
                <Route path="/return-refund-policy" element={<ReturnAndRefundPolicy/>} />
                <Route path="/contactus" element={<ContactUs/>} />
                <Route path="/addproduct" element={<SellerRoute><Addproducts/></SellerRoute>} />
               <Route path="/Wishlist" element={<Wishlist/>} />
                <Route path="/checkout" element={<Checkout/>} />
                <Route path="/Wishlist" element={<Wishlist/>} />
                <Route path="/manageusers" element={<ManageUsers/>} />
                <Route path="/seller" element={<SellerDashboard/>}/>
                <Route path="/manageproduct" element={<ManageProducts/>}/>
                <Route path="/mylistings" element={<MyListings/>}/>
              </Routes>
            </Col>
          </Row>
        </Container>
        </WishlistContextProvider>
        </CartContextProvider>
      </ProductContextProvider>
    </UserAuthContextProvider>
  );
}

export default App;
