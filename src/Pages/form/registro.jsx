import React, { useState } from 'react';

const Register = () => {
  const [show, setShow] = useState(false);
  const [error, setError] = useState({});
  const [contacto, setContacto] = useState({
    nombre: '',
    apellido: '',
    email: '',
    contrasena: '',
    confirmContrasena: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContacto({ ...contacto, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;

  const validateForm = () => {
    let errors = {};

    if (!contacto.nombre || /[^a-zA-Z\s]/.test(contacto.nombre)) {
      errors.nombre = 'Nombre inválido, solo letras son permitidas.';
    }
    if (!contacto.apellido || /[^a-zA-Z\s]/.test(contacto.apellido)) {
      errors.apellido = 'Apellido inválido, solo letras son permitidas.';
    }
    if (!emailPattern.test(contacto.email)) {
      errors.email = 'Correo electrónico inválido.';
    }
    if (!passwordPattern.test(contacto.contrasena)) {
      errors.contrasena =
        'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.';
    }
    if (contacto.contrasena !== contacto.confirmContrasena) {
      errors.confirmContrasena = 'Las contraseñas no coinciden.';
    }

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  return (
    <div>
      <div className='form-container'>
        <h2 id='titulo-registro'>Registro de Usuario</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor='nombre'>Nombre:</label>
          <input
            type='text'
            id='nombre'
            name='nombre'
            value={contacto.nombre}
            onChange={handleChange}
            required
            placeholder='Ingrese su nombre'
          />
          {error.nombre && <p style={{ color: 'red' }}>{error.nombre}</p>}

          <label htmlFor='apellido'>Apellido:</label>
          <input
            type='text'
            id='apellido'
            name='apellido'
            value={contacto.apellido}
            onChange={handleChange}
            required
            placeholder='Ingrese su apellido'
          />
          {error.apellido && <p style={{ color: 'red' }}>{error.apellido}</p>}

          <label htmlFor='email'>Correo Electrónico:</label>
          <input
            type='email'
            id='email'
            name='email'
            required
            placeholder='Ingrese su correo electrónico'
            value={contacto.email}
            onChange={handleChange}
          />
          {error.email && <p style={{ color: 'red' }}>{error.email}</p>}

          <label htmlFor='contrasena'>Contraseña:</label>
          <input
            type='password'
            id='contrasena'
            name='contrasena'
            value={contacto.contrasena}
            onChange={handleChange}
            required
            placeholder='Ingrese su contraseña'
          />
          {error.contrasena && (
            <p style={{ color: 'red' }}>{error.contrasena}</p>
          )}

          <label htmlFor='confirmContrasena'>Confirmar Contraseña:</label>
          <input
            type='password'
            id='confirmContrasena'
            name='confirmContrasena'
            required
            placeholder='Confirme su contraseña'
            value={contacto.confirmContrasena}
            onChange={handleChange}
          />
          {error.confirmContrasena && (
            <p style={{ color: 'red' }}>{error.confirmContrasena}</p>
          )}

          <input
            type='submit'
            value='Registrarse'
          />
        </form>
      </div>

      {show && (
        <h4 style={{ color: 'green' }}>
          Gracias {contacto.nombre}, por registrarte
        </h4>
      )}
    </div>
  );
};

export default Register;
