import { API } from '../api/api';
import axios from 'axios';

export const getCategory = async () => {
  const response = await fetch(`${API}/category`);
  const tour = await response.json();
  return tour;
};

export const getCategoryById = async (id) => {
  const response = await fetch(`${API}/category/${id}`);
  return response.json();  
};


export const postCategory = async (categoryData) => {
  try {
    const response = await fetch(`${API}/category`, {
      method: 'POST',
      body: JSON.stringify(categoryData),
      headers: {
        'Content-Type': 'application/json', // Asegúrate de enviar los datos en formato JSON
      },
    });

    if (!response.ok) {
      const errorResponse = await response.text();
      console.error('Error en la creación de la categoría:', errorResponse);
      throw new Error(`Error al crear la categoría. Status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al crear la categoría:', error);
    throw error;
  }
};
