import { API } from '../api/api';

export const getAllCategory = async () => {
  const response = await fetch(`${API}/category`);
  const categories = await response.json();
  return categories;
};
