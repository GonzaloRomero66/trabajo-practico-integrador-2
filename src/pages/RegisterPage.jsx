import useForm from "../hooks/useForm";

const RegisterPage = () => {
  const { form, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Error al registrarse");
      }

      console.log("Registro exitoso:", data);

      handleReset();
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
  return (
    <div>
      <h1>Registrarse</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre</label>

          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Email</label>

          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label>Contraseña</label>

          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default RegisterPage;
