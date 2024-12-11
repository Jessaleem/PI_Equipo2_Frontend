import { API } from "../api/api";

export const getTourById = async ({ tourId }) => {
  const response = await fetch(`${API}/tour/${tourId}`);
  const tour = await response.json();
  return tour;
};

/**
 * Obtiene todos los tours con los filtros especificados.
 *
 * @param {Object} filter - Filtros para buscar los tours tipo objeto.
 * @param {string} [filter.startDate] - Fecha de inicio del filtro en formato .
 * @param {string} [filter.endDate] - Fecha de fin del filtro en formato .
 * @param {string} [filter.search] - Buscar tour por nombre o ciudad.
 * @returns {Promise<Object[]>} - Una promesa que resuelve con la lista de tours.
 */
export const getAllTours = async (filters) => {
  let filterQuery;

  if (filters) {
    filterQuery = new URLSearchParams(filters).toString();
  }
  const response = await fetch(`${API}/tour?${filters ? filterQuery : ""}`);
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

export const updateTourCategory = async ({ tourId, categoryId }) => {
  const response = await fetch(`${API}/tour/${tourId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      categoryId: Number(categoryId),
    }),
  });
  const tour = await response.json();
  return tour;
};

export const deleteTour = async (tourId) => {
  try {
    const response = await fetch(`${API}/tour/${tourId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      if (response.status === 204) {
        return {};
      }

      try {
        return await response.json();
      } catch {
        return {};
      }
    } else {
      const errorText = await response.text();
      throw new Error(
        `Error al eliminar el tour. Status: ${response.status}. Detalles: ${errorText}`
      );
    }
  } catch (error) {
    console.error("Error en la eliminación del tour:", error);
  }
};
export const getAvailableDatesByTourId = async (tourId) => {
  try {
    const response = await fetch(`${API}/tour/${tourId}/fechas`);
    if (!response.ok) {
      throw new Error("Error al obtener las fechas disponibles");
    }
    const dates = await response.json();
    return dates;
  } catch (error) {
    console.error("Error al obtener las fechas disponibles:", error);
    throw error;
  }
};
