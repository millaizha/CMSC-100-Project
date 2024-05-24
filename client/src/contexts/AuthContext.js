import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  // Login
  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsAuthenticated(true);
        setToken(data.token);
        localStorage.setItem("token", data.token);
        navigate("/");
      } else {
        return data.error;
      }
    } catch (error) {
      console.error("Error loggin in:", error);
      return "An error occured during login";
    }
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);
    localStorage.removeItem("token");
    navigate("/login");
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const responseClone = response.clone();

      if (response.ok) {
        alert("Registration successful! Please log in.");
        navigate("/");
      } else {
        const errorData = await responseClone.json();
        alert(errorData.error);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occured during registration");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
