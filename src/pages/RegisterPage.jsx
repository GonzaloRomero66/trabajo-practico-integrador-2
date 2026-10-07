import { useState } from "react";
import { Link, useNavigate } from "react-router";
import useForm from "../hooks/useForm";

export const RegisterPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [serverError, setServerError] = useState("");

  // Usamos 'form' que es la propiedad que retorna useForm
  const { username, email, password, form, handleInputChange, handleReset } =
    useForm({
      username: "",
      email: "",
      password: "",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setValidationErrors([]);
    setServerError("");

    try {
      // Ajustá la URL si tu backend usa '/api/auth/register' o '/auth/register'
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form), // <-- Corregido: 'form' en lugar de 'formState'
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 400 && data.errors) {
          setValidationErrors(data.errors);
        } else if (response.status === 500) {
          setServerError("Error interno del servidor. Por favor reintente.");
        } else {
          setServerError(data.message || "Error en el registro");
        }
        return;
      }

      handleReset();
      navigate("/login");
    } catch (err) {
      setServerError("No se pudo conectar con el servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Crear Cuenta
        </h2>

        {serverError && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {serverError}
          </div>
        )}

        {validationErrors.length > 0 && (
          <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 px-4 py-3 rounded mb-4 text-sm">
            <ul className="list-disc list-inside space-y-1">
              {validationErrors.map((err, index) => (
                <li key={err.path ? `${err.path}-${index}` : index}>
                  {err.msg || err}
                </li>
              ))}
            </ul>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="ejemplo123"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded-lg transition-colors disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          ¿Ya tienes cuenta?{" "}
          <Link
            to="/login"
            className="text-indigo-600 hover:underline font-medium"
          >
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
