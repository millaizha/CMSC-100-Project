import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Shop from "./pages/user/Shop";
import Cart from "./pages/user/Cart";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";
import Orders from "./pages/user/Orders";
import AdminReport from "./pages/admin/AdminReport";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminSales from "./pages/admin/AdminSales";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* FOR CUSTOMERS */}
            <Route
              path="/"
              element={
                <ProtectedRoute requiredRole="user">
                  <Shop />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute requiredRole="user">
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute requiredRole="user">
                  <Orders />
                </ProtectedRoute>
              }
            />

            {/* FOR ADMIN */}

            <Route
              path="/admin"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-users"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-products"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-sales"
              element={
                <ProtectedRoute requiredRole="admin">
                  <AdminSales />
                </ProtectedRoute>
              }
            />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
