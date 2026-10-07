import { Link } from "react-router-dom";

const Navbar = () => {

    return (
        <nav>

            <Link to="/">
                Inicio
            </Link>

            <Link to="/login">
                Iniciar sesión
            </Link>

            <Link to="/register">
                Registrarse
            </Link>

        </nav>
    );
};

export default Navbar;