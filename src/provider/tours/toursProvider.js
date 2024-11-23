import { API } from '../api/api';

export const getTourById = async ({ tourId }) => {
  const response = await fetch(`${API}/tour/${tourId}`);
  const tour = await response.json();
  return tour;
};

export const getAllTours = async () => {
  const response = await fetch(`${API}/tour/`);
  const tour = await response.json();
  return tour;
};
export const updateTourCategory = async ({ tourId, categoryId }) => {
  const response = await fetch(`${API}/tour/${tourId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      categoryId: Number(categoryId),
    }),
  });
  const tour = await response.json();
  return tour;
};
