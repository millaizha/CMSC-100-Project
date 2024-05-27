import { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

/**
 * COMPONENT: ProtectedRoute
 * PURPOSE: Controls access to specific routes based on user authentication status.
 *
 * CONTEXT:
 *  - AuthContext: Uses the `isAuthenticated` state and `checkAuth` function to determine if the user is authenticated.
 *
 * STATE:
 *  - loading (boolean): Indicates whether authentication is being checked.
 *
 * USAGE:
 *  - Wraps routes that should only be accessible to authenticated users.
 *  - Redirects unauthenticated users to the login page.
 */

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
