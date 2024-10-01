import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import api from "../components/api"; // Đường dẫn tới file api.js
import { UserContext } from "../context/UserContext"; // Đường dẫn tới UserContext

const PrivateRoute = ({ element }) => {
  const { user, setUser, isAuthenticated } = useContext(UserContext);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = document.cookie.replace(
          /(?:(?:^|.*;\s*)itoken\s*=\s*([^;]*).*$)|^.*$/,
          "$1"
        );
        if (token) {
          const response = await api.get("/user/", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } else {
          throw new Error("No token found");
        }
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (loading) {
    return (
      <>
        <div className="loading-screen">
          <span className="loader">
            <div className="text">iWorks</div>
          </span>
        </div>
      </>
    );
  }

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default PrivateRoute;
