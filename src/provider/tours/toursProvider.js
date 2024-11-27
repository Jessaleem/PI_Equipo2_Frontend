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

export const addCharacteristicsToTour = async (tourId, characteristicIds) => {
  try {
    const response = await fetch(`${API}/tour/${tourId}`, {
      method: "PATCH",
      body: JSON.stringify({
        characteristicId: characteristicIds,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error("Error al añadir características:", errorResponse);
      throw new Error(
        `Error al añadir características. Status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al añadir características:", error);
    throw error;
  }
};
