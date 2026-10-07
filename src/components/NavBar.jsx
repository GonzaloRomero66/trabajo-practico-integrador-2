import { Link, useNavigate } from "react-router";
import { useState } from "react";
// Se importa link para poder navegar entre paginas y
// useNavigate para cambiar de paginas dentro del codigo y
// useState para poder guardar los estados

export const Navbar = () => {
  // Crea y exporta el componente NavBar
  const navigate = useNavigate();
  // Crea navigate, que sirve para redirigir la pagina
  const [isLoading, setIsLoading] = useState(false);
  // isLoading es para indicar si esta cerrando sesion y empieza con false
  // porque al abrir la pagina no estas cerrando sesion
  // no tiene anda que cargar y cuando es true es cuando ya esta cargando
  const handleLogout = async () => {
    // creamos una funcion llamada handleLogout y le ponemos async porque
    // estamos esperando la respuesta del backend
    setIsLoading(true);
    // aca estamos poniendo true, porque al cerrar sesion
    // comenzaria a cargar
    try {
      // aca estamos haciendo try para poder verificar si se va a poder cerrar sesion
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      // aca seria que al intentar cerrar sesion no se pudo y se muestra un error
      console.error("Error al cerrar sesión:", error);
    } finally {
      // Esto siempre se va a ejecutar no importa si se pudo o no cerrar sesion
      localStorage.removeItem("isLogged");
      // Estamos haciendo que se quite el isLogged, que nos mostraria si
      // el usuario esta logueado o no
      setIsLoading(false);
      // aca terminaria de cargar porque ya cerro sesion para luego mandar a la linea de abajo
      navigate("/login");
      // Y esta linea te mandaria devuelta al login para poder iniciar sesion
    }
  };

  return (
    // aca comenzariamos a mostrar lo que aparece en pantalla
    // Esto crea la barra de navegacion, donde msotramos las sombras,
    // respectivos colores y como esten centrados
    <nav className="bg-slate-900 text-white shadow-md py-4 px-6 flex justify-between items-center mb-8">
      <Link
        // Aca crearimos el enlace Inicio que nos llevaria devuelta
        // al / que seria el home y tambien donde tocamos la apariencia de este
        to="/"
        className="text-xl font-bold tracking-wide hover:text-indigo-400 transition-colors"
      >
        Inicio
      </Link>
      <button
        // Estamos creando el boton de cerrar sesion
        // Onclick para que cuando para que cuando haces click al boton
        // ejecuta handleLogout para cerrar sesion
        // y si isLoading esta true, el boton queda desactivado
        onClick={handleLogout}
        disabled={isLoading}
        className="bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer"
      >
        {isLoading
          ? // Esto es una condicional corta donde si isLoading es true mostrara Cerrando sesion..
            // Y si es false solo mostrara Cerrar Sesion
            "Cerrando sesión..."
          : "Cerrar Sesión"}
      </button>
    </nav>
  );
};
// Esto nos permite importar Nacbar a otros archivos
export default Navbar;
