import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, checkAuth } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authenticate = async () => {
      try {
        await checkAuth();
        setLoading(false);
      } catch (error) {
        console.error("Error checking authentication:", error);
        setLoading(false);
      }
    };
    authenticate();
  }, [checkAuth]);

  if (loading) {
    return <></>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
