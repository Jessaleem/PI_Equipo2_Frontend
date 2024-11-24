import { API } from "../api/api";
export const getTourById = async ({ tourId }) => {
  const response = await fetch(`${API}/tour/${tourId}`);
  const tour = await response.json();
  return tour;
};

export const getAllTours = async () => {
  const response = await fetch(`${API}/tour`);
  const tour = await response.json();
  return tour;
};
