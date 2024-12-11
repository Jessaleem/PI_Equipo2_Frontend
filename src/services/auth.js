import { API } from '../provider/api/api';

export async function login(auth) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(auth),
  };
  try {
    const response = await fetch(
      `${API}/auth/login`,
      options
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}

export const register = async (data) => {
  const body = {
    name: `${data.nombre} ${data.apellido}`,
    email: data.email,
    password: data.contrasena,
  };
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  try {
    const response = await fetch(`${API}/users`, options);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error desconocido');
    }
    
    return await response.json();

  } catch (error) {
    console.error('Error en la solicitud:', error);
    throw error;
  }
};
