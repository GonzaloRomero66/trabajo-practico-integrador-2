import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { Navbar } from "../components/NavBar";

export const AppRouter = () => {
  const isLogged = localStorage.getItem("isLogged") === "true";

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas Públicas */}
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas Privadas: El Navbar solo se muestra aquí */}
        <Route element={<PrivateRoutes />}>
          <Route
            path="/"
            element={
              <>
                <Navbar />
                <HomePage />
              </>
            }
          />
        </Route>

        {/* Ruta comodín */}
        <Route
          path="*"
          element={<Navigate to={isLogged ? "/" : "/login"} replace />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
