import axios from "axios";
import { API } from "../api/api";

export const checkTourByName = async (name) => {
  try {
    const response = await axios.get(`${API}/tour?name=${name}`);
    if (response.data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error al verificar el nombre del tour:", error);
    return false;
  }
};
