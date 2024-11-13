import React, { useState } from "react";
import axios from "axios";

const Register = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const [contacto, setContacto] = useState({
    nombre: "",
    apellido: "",
    email: "",
    contrasena: "",
    confirmContrasena: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContacto({ ...contacto, [name]: value });
    setError({ ...error, [name]: "" });
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;

  const validateForm = () => {
    let errors = {};

    if (!contacto.nombre || /[^a-zA-Z\s]/.test(contacto.nombre)) {
      errors.nombre = "Nombre inválido, solo letras son permitidas.";
    }
    if (!contacto.apellido || /[^a-zA-Z\s]/.test(contacto.apellido)) {
      errors.apellido = "Apellido inválido, solo letras son permitidas.";
    }
    if (!emailPattern.test(contacto.email)) {
      errors.email = "Correo electrónico inválido.";
    }
    if (!passwordPattern.test(contacto.contrasena)) {
      errors.contrasena =
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.";
    }
    if (contacto.contrasena !== contacto.confirmContrasena) {
      errors.confirmContrasena = "Las contraseñas no coinciden.";
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        // Enviar datos al backend
        const response = await axios.post(
          "http://localhost:3001/api/register",
          {
            nombre: contacto.nombre,
            apellido: contacto.apellido,
            email: contacto.email,
            contrasena: contacto.contrasena,
          }
        );

        console.log(response.data.message);
        setShow(true);
      } catch (error) {
        console.error(
          "Error al registrar usuario:",
          error.response?.data || error.message
        );
        alert("Hubo un error al registrar");
      }
    } else {
      setShow(false);
    }
  };

  return (
    <div className="registro">
      <div className="form-container">
        <h2 id="titulo-registro">Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={contacto.nombre}
            onChange={handleChange}
            required
          />
          {error.nombre && <p style={{ color: "red" }}>{error.nombre}</p>}

          <label>Apellido:</label>
          <input
            type="text"
            name="apellido"
            value={contacto.apellido}
            onChange={handleChange}
            required
          />
          {error.apellido && <p style={{ color: "red" }}>{error.apellido}</p>}

          <label>Correo Electrónico:</label>
          <input
            type="email"
            name="email"
            value={contacto.email}
            onChange={handleChange}
            required
          />
          {error.email && <p style={{ color: "red" }}>{error.email}</p>}

          <label>Contraseña:</label>
          <input
            type="password"
            name="contrasena"
            value={contacto.contrasena}
            onChange={handleChange}
            required
          />
          {error.contrasena && (
            <p style={{ color: "red" }}>{error.contrasena}</p>
          )}

          <label>Confirmar Contraseña:</label>
          <input
            type="password"
            name="confirmContrasena"
            value={contacto.confirmContrasena}
            onChange={handleChange}
            required
          />
          {error.confirmContrasena && (
            <p style={{ color: "red" }}>{error.confirmContrasena}</p>
          )}

          <input type="submit" value="Registrarse" />
        </form>
      </div>

      {show && (
        <h4 style={{ color: "green" }}>
          Gracias {contacto.nombre}, por registrarte
        </h4>
      )}
    </div>
  );
};

export default Register;
