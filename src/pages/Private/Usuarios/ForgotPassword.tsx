import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { forgotPassword } from "../../../services/Usuarios/Usuarios.service";

function ForgotPassword() {
  // Estados del formulario
  const [formData, setFormData] = useState({ email: "", telefono: "" });
  const [errors, setErrors] = useState<any>({});
  const [successMessage, setSuccessMessage] = useState<string | boolean>(false);
  const [serverError, setServerError] = useState<string | boolean>(false);

  const navigate = useNavigate();

  // Validaciones de los campos
  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const telefonoRegex = /^[0-9]{10}$/;
    const newErrors: any = {};

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }
    if (!telefonoRegex.test(formData.telefono)) {
      newErrors.telefono = "El número de teléfono debe contener 10 dígitos.";
    }
    return newErrors;
  };

  

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setErrors({});
    setServerError(false);
    setSuccessMessage(false);

    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await forgotPassword(formData.email, formData.telefono);
      setSuccessMessage("Se ha enviado un correo para recuperar tu contraseña.");
      setFormData({ email: "", telefono: "" });

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 3000);
    } catch (error) {
      console.error(error);
      setServerError("Ocurrió un error al intentar recuperar la contraseña.");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 lg:px-8">
      <div className="mx-auto w-full max-w-screen-sm rounded-lg p-8 shadow-lg bg-white dark:bg-gray-800">
        <h2 className="text-center text-2xl font-bold text-gray-900 dark:text-white">
          Recuperar Contraseña
        </h2>

        {successMessage && (
          <Alert type="success" message={successMessage.toString()} />
        )}
        {serverError && (
          serverError && <Alert type="error" message={serverError as string} />
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <InputField
            id="email"
            label="Correo Electrónico"
            placeholder="Correo Electrónico"
            name="email"
            value={formData.email}
            onChange={(e:any) => {
              const lowerCaseEmail = e.target.value.toLowerCase(); // Convierte a minúsculas
              setFormData((prev) => ({ ...prev, email: lowerCaseEmail }));
            }}
            error={errors.email}
            type="email"
            required
          />
          <InputField
            id="telefono"
            label="Teléfono"
            name="telefono"
            value={formData.telefono}
            onChange={(e: any) => {
              const onlyNumbers = e.target.value.replace(/\D/g, ""); // Elimina caracteres no numéricos
              setFormData((prev) => ({ ...prev, telefono: onlyNumbers }));
            }}
            error={errors.telefono}
            type="text"
            maxLength={10}
            placeholder="Solo 10 dígitos"
            required
          />
          <button
            type="submit"
            className="w-full rounded-md bg-indigo-600 px-4 py-2 text-sm font-bold text-white hover:bg-indigo-500 focus:ring-2 focus:ring-indigo-500"
          >
            Recuperar Contraseña
          </button>
        </form>
      </div>
    </div>
  );
}

function InputField({ id, label, error, ...props }: { id: string; label: string; error?: string; [key: string]: any }) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-900 dark:text-gray-200">
        {label}
      </label>
      <input
        id={id}
        className={`w-full mt-1 rounded-md p-2 border ${error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-indigo-500"
          } bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-200`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

function Alert({ type, message }: { type: "success" | "error"; message: string }) {
  const colors = {
    success: "bg-green-500",
    error: "bg-red-500",
  };
  return (
    <div className={`${colors[type]} rounded-md text-white p-2 text-center`}>
      {message}
    </div>
  );
}

export default ForgotPassword;
