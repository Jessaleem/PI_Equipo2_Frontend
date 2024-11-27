import { API } from "../api/api";

export const getAllCharacteristics = async () => {
  const response = await fetch(`${API}/characteristics`);
  const tour = await response.json();
  return tour;
};
