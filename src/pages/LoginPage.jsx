import useForm from "../hooks/useForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  const { form, handleInputChange, handleReset } = useForm({
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }

      console.log("Login exitoso:", data);

      localStorage.setItem("isAuthenticated", "true");

      handleReset();

      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            className="border border-black"
          />
        </div>

        <div>
          <label>Contraseña</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            className="border border-black"
          />
        </div>

        <button type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default LoginPage;
