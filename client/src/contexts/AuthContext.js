import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
      setIsAuthenticated(true);
      console.log("AUTHENTICATED");
    } else {
      setIsAuthenticated(false);
      console.log("NOT AUTHENTICATED");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  // Login
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:3001/auth/login", {
        email,
        password,
      });

      if (response.status === 200) {
        setIsAuthenticated(true);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        checkAuth();
        navigate("/");
      } else {
        return response.data.error;
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
    checkAuth();
    navigate("/login");
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        userData
      );

      if (response.status === 200) {
        alert("Registration successful! Please log in.");
        navigate("/");
      } else {
        alert(response.data.error);
      }
    } catch (error) {
      console.error("Error registering:", error);
      alert("An error occured during registration");
    }
  };

  return (
    <AuthContext.Provider
      value={{ token, checkAuth, isAuthenticated, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
};
