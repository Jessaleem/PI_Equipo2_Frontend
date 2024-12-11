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
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
