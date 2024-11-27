import { API } from "../api/api";
import axios from "axios";

export const getCategory = async () => {
  const response = await fetch(`${API}/category`);
  const tour = await response.json();
  return tour;
};

export const postTour = async (tourData) => {
  try {
    const response = await fetch(`${API}/tour`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tourData), // Asegúrate de enviar los datos como JSON
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error("Error en la creación del tour:", errorResponse);
      throw new Error(`Error al crear el tour. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear el tour:", error);
    throw error;
  }
};
