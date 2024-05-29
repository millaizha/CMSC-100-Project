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
import AdminSales from "./pages/admin/AdminSales";
import AdminUsers from "./pages/admin/AdminUsers";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Shop />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <Cart />
                </ProtectedRoute>
              }
            />
            <Route
              path="/my-orders"
              element={
                <ProtectedRoute>
                  <Orders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <AdminInventory />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-report"
              element={
                <ProtectedRoute>
                <AdminReport />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-sales"
              element={
                <ProtectedRoute>
                  <AdminSales />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin-users"
              element={
                <ProtectedRoute>
                  <AdminUsers />
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
