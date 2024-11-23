import { API } from '../api/api';

export const getAllUser = async () => {
  const response = await fetch(`${API}/users`);
  const users = await response.json();
  return users;
};

export const updateUserType = async ({ userId, type }) => {
  const response = await fetch(`${API}/users/${userId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: Number(type),
    }),
  });
  const user = await response.json();
  return user;
};
