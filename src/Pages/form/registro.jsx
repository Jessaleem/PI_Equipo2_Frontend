// src/pages/Register.jsx
import React from "react";

const Register = () => {
	return (
		<div>
			<div class="form-container">
				<h2 id="titulo-registro">Registro de Usuario</h2>
				<form action="/..." method="POST">
					<label for="nombre">Nombre:</label>
					<input
						type="text"
						id="nombre"
						name="nombre"
						required
						placeholder="ingrese su nombre"
					/>

					<label for="apellido">Apellido:</label>
					<input
						type="text"
						id="apellido"
						name="apellido"
						required
						placeholder="ingrese su apellido"
					/>

					<label for="telefono">Número de Teléfono:</label>
					<input
						type="tel"
						id="telefono"
						name="telefono"
						required
						pattern="[0-9]{10}"
						placeholder="ingrese su numero telefono"
					/>

					<label for="email">Correo Electrónico:</label>
					<input
						type="email"
						id="email"
						name="email"
						required
						placeholder="ingrese su correo electronico"
					/>

					<label for="contraseña">Contraseña:</label>
					<input
						type="password"
						id="contraseña"
						name="contraseña"
						required
						placeholder="ingrese su contraseña"
					/>

					<label for="confirmar-contraseña">Confirmar Contraseña:</label>
					<input
						type="password"
						id="confirmar-contraseña"
						name="confirmar-contraseña"
						required
						placeholder="confirme su contraseña"
					/>

					<input type="submit" value="Registrarse" />
				</form>

				
			</div>
		</div>
	);
};

export default Register;