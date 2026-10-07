import { Link, useNavigate } from "react-router";
import { useState } from "react";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    } finally {
      localStorage.removeItem("isLogged");
      setIsLoading(false);
      navigate("/login");
    }
  };

  return (
    <nav className="bg-slate-900 text-white shadow-md py-4 px-6 flex justify-between items-center mb-8">
      <Link
        to="/"
        className="text-xl font-bold tracking-wide hover:text-indigo-400 transition-colors"
      >
        Blog App
      </Link>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
      >
        {isLoading ? "Cerrando sesión..." : "Cerrar Sesión"}
      </button>
    </nav>
  );
};

export default Navbar;
