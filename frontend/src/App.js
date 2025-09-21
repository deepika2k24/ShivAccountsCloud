// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./screens/Landing";
import UserLogin from "./screens/UserLogin";
import AdminLogin from "./screens/AdminLogin";
import CreateUser from "./screens/CreateUser";
import ContactMaster from "./screens/ContactMaster";
import AdminDashboard from "./screens/AdminDashboard";
import AccountantLogin from "./screens/AccountantLogin";
import UserDashboard from "./screens/UserDashboard";
//import AdminListView from "./screens/AdminListView"; // Import the list view page
import AdminListWithErrorBoundary from "./screens/AdminListView";
import ViewProducts from "./screens/ViewProducts";
import PurchaseOrder from "./screens/PurchaseOrder";
import PurchaseBill from "./screens/PurchaseBill";
import PurchaseHistory from "./screens/PurchaseHistory";
import Payment from "./screens/Payment";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<Landing />} />

        {/* Login Pages */}
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />

        {/* Admin Features */}
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-list-view" element={<AdminListWithErrorBoundary />} /> {/* Admin List View */}

        {/* User Features */}
        <Route path="/contact-master" element={<ContactMaster />} />
        <Route path="/accountant-login" element={<AccountantLogin />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/view-products" element={<ViewProducts />} />
        <Route path="/purchase-order" element={<PurchaseOrder />} />
        <Route path="/purchase-bill" element={<PurchaseBill />} />
        <Route path="/purchase-history" element={<PurchaseHistory />} />
        <Route path="/payment" element={<Payment />} />
      </Routes>
    </Router>
  );
}

export default App;
