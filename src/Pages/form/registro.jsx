import React, { useState, useEffect } from 'react';
import { register } from '../../services/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';


const initailState = {
  nombre: '',
  apellido: '',
  email: '',
  contrasena: '',
  confirmContrasena: '',
};
const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState({});
  const [contacto, setContacto] = useState(initailState);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [registrationError, setRegistrationError] = useState('');
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const [countdown, setCountdown] = useState(10);

  const fields = [
    { name: 'nombre', label: 'Nombre', placeholder: 'Ingrese su nombre', type: 'text' },
    { name: 'apellido', label: 'Apellido', placeholder: 'Ingrese su apellido', type: 'text' },
    { name: 'email', label: 'Correo Electrónico', placeholder: 'Ingrese su correo electrónico', type: 'email' },
    { name: 'contrasena', label: 'Contraseña', placeholder: 'Ingrese su contraseña', type: 'password' },
    { name: 'confirmContrasena', label: 'Confirmar Contraseña', placeholder: 'Confirme su contraseña', type: 'password' },
  ];

  const handleChange = (event) => {
    const { name, value } = event.target;
    setContacto({ ...contacto, [name]: value });
    setError({ ...error, [name]: '' });
  };

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*\d)(?=.*[A-Z])(?=.*\W).{8,}$/;

  const mutation = useMutation({
    mutationFn: register,
    onSuccess: () => {
      setIsSubmitted(true);
      setContacto(initailState);
      setRegistrationError('');
    },
    onError: (error) => {
      if (error.response && error.response.data && error.response.data.message) {
        setRegistrationError(error.response.data.message);
      } else {
        setRegistrationError('Falló en el Registro!');
      }
      setIsErrorModalOpen(true);
    },
  });


  const validateField  = (field) => {
    const value = contacto[field.name];
    let errorMessage = '';
    if (!value) {
      errorMessage = `${field.label} es obligatorio.`;
    }

    else if (field.name === 'nombre' && !contacto.nombre || /[^a-zA-Z\s]/.test(contacto.nombre)) {
      errorMessage = 'Nombre inválido, solo letras son permitidas.';
    }
    else if (field.name === 'apellido' && !contacto.apellido || /[^a-zA-Z\s]/.test(contacto.apellido)) {
      errorMessage = 'Apellido inválido, solo letras son permitidas.';
    }
    else if (field.name === 'email' && !emailPattern.test(contacto.email)) {
      errorMessage = 'Correo electrónico inválido.';
    }
    else if (field.name === 'contrasena' && !passwordPattern.test(contacto.contrasena)) {
      errorMessage = 'La contraseña debe tener al menos 8 caracteres, una letra mayúscula, un número y un carácter especial.';
    }
    else if (field.name === 'confirmContrasena' && contacto.contrasena !== contacto.confirmContrasena) {
      errorMessage = 'Las contraseñas no coinciden.';
    }

    setError({ ...error, [field.name]: errorMessage });
    return !errorMessage;
  };

  const handleNext = () => {
    const field = fields[currentStep];
    if (validateField(field)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (fields.every((field) => validateField(field))) {
      mutation.mutate(contacto, {
        onSuccess: () => {
          setIsSubmitted(true); // Mostrar mensaje de éxito
          setContacto(initialState); // Reiniciar datos del formulario
        },
      });
    }
  };
  
  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
    setRegistrationError('');
  };

  useEffect(() => {
    if (isSubmitted) {
      const timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);

      if (countdown === 0) {
        clearInterval(timer);
        navigate(`/`); // Redirige al home después de la cuenta regresiva
      }

      return () => clearInterval(timer); // Limpia el intervalo al desmontar
    }
  }, [isSubmitted, countdown, navigate]);


  if (isSubmitted) {
    return (
      <div className="success-message">
        <div className="success-container">
          <div className="success-icon">
            ✅
          </div>
          <h2>¡Registro Exitoso!</h2>
          <p>Gracias por registrarte, <strong>{contacto.nombre}</strong>. Tu cuenta ha sido creada con éxito.</p>
          <p>
            Ahora puedes iniciar sesión y disfrutar de nuestros servicios. 
            Si tienes alguna pregunta, no dudes en contactarnos.
          </p>
          <p>Serás redirigido al inicio en {countdown} segundos...</p>
        </div>
      </div>
    );
  }
  return (
    <div className="form-container p-0 min-vh-100">
      <h2 id="titulo-registro">Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        {fields.map((field, index) => (
          <div
            key={field.name}
            style={{ display: index === currentStep ? 'block' : 'none' }}
          >
            <label htmlFor={field.name}>{field.label}:</label>
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={contacto[field.name]}
              onChange={handleChange}
              placeholder={field.placeholder}
            />
            <div className="error">{error[field.name]}</div>
          </div>
        ))}
        <div className="form-navigation">
          {currentStep > 0 && (
            <button className="botonFormRegistro"
              type="button"
              onClick={() => setCurrentStep(currentStep - 1)}
            >
              Anterior
            </button>
          )}
          {currentStep < fields.length - 1 && (
            <button className="botonFormRegistro" type="button" onClick={handleNext}>
              Siguiente
            </button>
          )}
          {currentStep === fields.length - 1 && (
            <input type="submit" value="Registrarse" />
          )}
        </div>
      </form>

      <Modal
        isOpen={isErrorModalOpen}
        onRequestClose={closeErrorModal}
        contentLabel="Error Modal"
        className="error-modal error-message"
        overlayClassName="error-modal-overlay"
      >
        <div className="error-container error-container">
          <div className="error-icon error-icon">
            ❌
          </div>
          <h2>{registrationError}</h2>
          <h3>El correo ya existe</h3>
          <p>
            
            Por favor, verifica los datos ingresados y vuelve a intentarlo.
            Si el problema persiste, no dudes en contactarnos.
          </p>
          <button onClick={closeErrorModal}>Cerrar</button>
        </div>
      </Modal>
    </div>
  );
};

export default Register;
