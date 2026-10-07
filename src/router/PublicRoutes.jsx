import { Navigate } from "react-router-dom";

const PublicRoutes = ({ children }) => {
  const isAuthenticated = localStorage.getItem("isAuthenticated");

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

export default PublicRoutes;
