import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Shop from "./pages/user/Shop";
import Cart from "./pages/user/Cart";
import { CartProvider } from "./contexts/CartContext";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./contexts/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <Routes>
            <Route path="/" element={
              <ProtectedRoute>
                  <Shop />
              </ProtectedRoute>
      
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<ProtectedRoute>
                <Cart />
              </ProtectedRoute>} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
