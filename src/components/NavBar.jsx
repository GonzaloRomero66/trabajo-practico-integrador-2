import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const isAuthenticated = localStorage.getItem("isAuthenticated");

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:3000/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("isAuthenticated");

      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error.message);
    }
  };

  return (
    <nav>
      <Link to="/">Inicio</Link>

      {!isAuthenticated && (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/register">Registrarse</Link>
        </>
      )}

      {isAuthenticated && <button onClick={handleLogout}>Cerrar sesión</button>}
    </nav>
  );
};

export default Navbar;
