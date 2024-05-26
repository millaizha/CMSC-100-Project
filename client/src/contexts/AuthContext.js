import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const [userEmail, setUserEmail] = useState(null);
  const [userFirstName, setUserFirstName] = useState(null);

  const checkAuth = () => {
    const storedToken = localStorage.getItem("token");
    const storedEmail = localStorage.getItem("email");
    const storedFirstName = localStorage.getItem("firstName");

    if (storedToken) {
      setToken(storedToken);
      setUserEmail(storedEmail);
      setUserFirstName(storedFirstName);
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
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
        localStorage.setItem("email", email);
        localStorage.setItem("firstName", response.data.firstName);
        checkAuth();

        setUserEmail(email);
        setUserFirstName(response.data.firstName);
        navigate("/");
      } else {
        return response.data.error;
      }
    } catch (error) {
      console.error("Error loggin in:", error);
      if (error.response.status === 401) {
        return "Wrong email or password. Please try again";
      } else {
        return "An error occured during login";
      }
    }
  };

  // Logout
  const logout = () => {
    setIsAuthenticated(false);
    setToken(null);

    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("firstName");

    checkAuth();
    setUserEmail(null);
    setUserFirstName(null);
    navigate("/login");
  };

  // Register
  const register = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:3001/auth/register",
        userData
      );

      if (response.status === 201) {
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
      value={{
        token,
        checkAuth,
        isAuthenticated,
        login,
        logout,
        register,
        userEmail,
        userFirstName,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
