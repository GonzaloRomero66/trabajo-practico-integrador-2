const RegisterPage = () => {

    return (
        <div>

            <h1>Registrarse</h1>

            <form>

                <div>
                    <label>Nombre</label>

                    <input
                        type="text"
                        name="name"
                    />
                </div>

                <div>
                    <label>Email</label>

                    <input
                        type="email"
                        name="email"
                    />
                </div>

                <div>
                    <label>Contraseña</label>

                    <input
                        type="password"
                        name="password"
                    />
                </div>

                <button type="submit">
                    Registrarse
                </button>

            </form>

        </div>
    );
};

export default RegisterPage;