import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { singup } from "../../../../services/Usuarios/Usuarios.service";
import { PrivateRoutes } from "../../../../models";
import { GridClearIcon } from "@mui/x-data-grid";
import { Fab } from "@mui/material";
import InputField from "../../../../components/Form/InputField";

function Register() {
  // Estados para manejar datos del formulario y errores
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [error, setError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [telefonoError, setTelefonoError] = useState(false);

  const navigate = useNavigate();

  const cancel = () => {
    navigate(`/private/${PrivateRoutes.USUARIOS}`, { replace: true });
  };

  const handleRegister = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(false);
    setPasswordError(false);
    setEmailError(false);
    setTelefonoError(false);

    if (password !== confirmPassword) {
      setPasswordError(true);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      return;
    }

    const telefonoRegex = /^[0-9]{10}$/;
    if (!telefonoRegex.test(telefono)) {
      setTelefonoError(true);
      return;
    }

    try {
      const user: any = {
        firstname: nombre,
        lastname: `${apellidoPaterno} ${apellidoMaterno}`,
        email: email,
        phoneNumber: telefono,
        address: direccion,
        password: password
      };
      const response = await singup(user);
      console.log(response);
      // Reiniciar los errores después de un registro exitoso
      setError(false);
      setPasswordError(false);
      setEmailError(false);
      setTelefonoError(false);

      navigate(`/${PrivateRoutes.USUARIOS}`, { replace: true });
    } catch (e) {
      console.error(e);
      setError(true);  // Si algo sale mal, se muestra el error
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className="mt-5 mx-auto w-full max-w-screen-md rounded-lg p-8 shadow-lg bg-white dark:bg-gray-800">
      <Fab
        variant="circular"
        color="error"
        sx={{
          height: '40px',
          width: '40px',
          marginRight: '30px',
        }}
        className="bg-primary text-white hover:bg-primary-dark"
        onClick={cancel}
      >
        <GridClearIcon />
      </Fab>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 dark:text-white">
            Registro de Usuario
          </h2>

          {error && <ErrorMessage mensaje="Ha ocurrido un error al registrarte." />}
          {passwordError && <ErrorMessage mensaje="Las contraseñas no coinciden." />}
          {emailError && <ErrorMessage mensaje="El correo no es válido." />}
          {telefonoError && <ErrorMessage mensaje="El número de teléfono debe contener 10 dígitos." />}
        </div>

        <form onSubmit={handleRegister} method="POST" className="mt-6 space-y-6">
          <InputField id="nombre" label="Nombre" value={nombre} setValue={setNombre} required />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="apellidoPaterno"
              label="Apellido Paterno"
              value={apellidoPaterno}
              setValue={setApellidoPaterno}
              required
            />
            <InputField
              id="apellidoMaterno"
              label="Apellido Materno"
              value={apellidoMaterno}
              setValue={setApellidoMaterno}
              required
            />
          </div>
          <InputField id="email" label="Email" value={email} setValue={setEmail} type="email" required />
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="password"
              label="Contraseña"
              value={password}
              setValue={setPassword}
              type="password"
              required
            />
            <InputField
              id="confirmPassword"
              label="Confirmar Contraseña"
              value={confirmPassword}
              setValue={setConfirmPassword}
              type="password"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <InputField
              id="telefono"
              label="Teléfono"
              value={telefono}
              setValue={setTelefono}
              type="tel"
              required
              maxLength={10}
              placeholder="Solo 10 dígitos"
            />
            <InputField
              id="direccion"
              label="Dirección"
              value={direccion}
              setValue={setDireccion}
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
            >
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function ErrorMessage(mensaje: any) {
  return (
    <h2 className="mt-2 text-center text-sm bg-red-500 rounded-md text-white p-2">
      {mensaje}
    </h2>
  );
}



export default Register;
