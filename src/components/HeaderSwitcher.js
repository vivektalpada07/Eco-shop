import React from "react";
import { useUserAuth } from "../context/UserAuthContext";
import AdminHeader from "./Adminheader"; // Replace with the actual path to your AdminHeader component
import SellerHeader from "./SellerHeader"; // Replace with the actual path to your SellerHeader component
import CustomerHeader from "./Customerheader";
import Header from "./Header";
 
const HeaderSwitcher = () => {
  const { role } = useUserAuth();
 
  return (
    <>
      {role === "admin" && <AdminHeader />}
      {role === "seller" && <SellerHeader />}
      {role === "customer" && <CustomerHeader />}
      {role !== "admin" && role !== "seller" && role!=="customer" && <Header />}
      {/* Optionally, handle other roles or a default header */}
    </>
  );
};
 
export default HeaderSwitcher;