import { useDispatch } from "react-redux";
import { getUser } from "../../services";
import { createUser } from "../../redux/states/user";
import { useNavigate } from "react-router-dom";
import { PrivateRoutes } from "../../models";
import { useState } from "react";
import { getMyUser } from "../../services/Usuarios/Usuarios.service";
import { Button } from "@mui/material";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);  // Estado para manejar el error
  const [isLoading, setIsLoading] = useState(false);

  const login = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);  // Resetea el error al intentar iniciar sesión de nuevo
    try {
      // Obtiene el token del backend
      setIsLoading(true);
      const { token } = await getUser(email, password);
      const user = await getMyUser(token);

      setTimeout(() => {
        dispatch(createUser({ token, user })); // Asegúrate de que se esté pasando el objeto 'user' correctamente
        navigate(`/${PrivateRoutes.PRIVATE}`, { replace: true });
        window.location.reload();
      }, 100);

    } catch (e) {
      setIsLoading(false);
      console.error(e);
      setError(true);  // Activa el mensaje de error si ocurre un problema
    }
  };


  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Logo"
            src="/img/Logo.jpg"
            className="mx-auto rounded h-1/2 w-1/2"
          />
          <h2 className="mt-1 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Inicia Sesion
          </h2>

          {/* Muestra el mensaje de error si existe */}
          {error && (
            <h2 className="mt-2 text-center text-lg bg-red-400 rounded-lg text-gray-900">
              Credenciales incorrectas.
            </h2>
          )}
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={login} method="POST" className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                Email
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900 dark:text-white">
                  Password
                </label>
                <div className="text-sm">
                  <a href="/forgotPassword" className="font-semibold text-indigo-600 hover:text-indigo-500">
                    Olvidaste tu contraseña?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className="flex w-full"
                disabled={isLoading}
              >
                 Iniciar Sesion
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
