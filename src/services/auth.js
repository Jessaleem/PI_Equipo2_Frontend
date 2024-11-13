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
      `http://localhost:8080/api/v1/auth/login`,
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
    const response = await fetch(`http://localhost:8080/api/users`, options);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
