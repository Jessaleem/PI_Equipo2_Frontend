import { useGeneralContext } from "../../../context/useGeneralContext";
import { useEffect, useState } from "react";
import { login } from "../../../services/auth";
import { useNavigate } from "react-router-dom";

const useFetchLogin = () => {
  const { setAbrirModal, dispatch } = useGeneralContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const savedUser = localStorage.getItem("userData");
    if (savedUser) {
      dispatch({ type: "USER_LOGGED_IN" });
      dispatch({ type: "USER_DATA", payload: JSON.parse(savedUser) });
      navigate("/");
    }
  }, []);

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
        if (data?.email && data?.type) {
          localStorage.setItem("userData", JSON.stringify(data));
          dispatch({ type: "USER_LOGGED_IN" });
          dispatch({ type: "USER_DATA", payload: data });
          navigate("/");
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
