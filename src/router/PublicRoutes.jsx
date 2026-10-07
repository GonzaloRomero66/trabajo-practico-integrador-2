import { Navigate, Outlet } from "react-router";

const PublicRoutes = () => {
  const isLogged = localStorage.getItem("isLogged") === "true";

  // Si ya está logueado, redirige a la página principal (/)
  return !isLogged ? <Outlet /> : <Navigate to="/" replace />;
};

export default PublicRoutes;
