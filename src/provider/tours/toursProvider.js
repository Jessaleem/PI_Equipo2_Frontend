import { API } from '../api/api';
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
  const filterQuery = new URLSearchParams(filters).toString();
  console.log(`${API}/tour?${filterQuery}`)
  // const response = await fetch(`${API}/tour?${filterQuery}`);
  // const tour = await response.json();
  // return tour;
};
