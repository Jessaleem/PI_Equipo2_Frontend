import { useGeneralContext } from "../../../context/useGeneralContext";
import { useState } from "react";
import { login } from "../../../services/auth";

const useFetchLogin = () => {
  const { setAbrirModal, dispatch } = useGeneralContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setAbrirModal(false);
    dispatch({ type: "CLOSE_LOGIN_MODAL" });
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    const auth = {
      email,
      password,
    };
    try {
      const data = await login(auth);
      if (data) {
        console.log(data);
        if (data?.email && data?.type) {
          dispatch({ type: "USER_LOGGED_IN" });
          dispatch({ type: "USER_DATA", payload: data });
        } else if (data.error) {
          if (data.statusCode === 404) {
            setErrorMessage("Usuario no encontrado");
          } else if (data.statusCode === 400) {
            setErrorMessage("Contraseña incorrecta");
          }
        }

        handleClose();
      } else {
        setErrorMessage(data?.message || "Error al iniciar sesión");
      }
    } catch (error) {
      console.error(error);
      setErrorMessage("Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errorMessage,
    setErrorMessage,
    loading,
    handleClose,
    handleLoginSubmit,
  };
};

export default useFetchLogin;
