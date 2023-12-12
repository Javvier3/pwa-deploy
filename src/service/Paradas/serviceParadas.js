import axios from "axios";
import { createURL } from "../../utils/environment";

const accessToken = localStorage.getItem('token');

//Create y update
export const saveOrUpdateParada = async (nombre,desc, lat, lng) => {
  try {
    const response = await axios.post(
      createURL(['/parada/']),
      {
        "nombre": nombre,
        "descripcion": desc,
        "latitud": lat,
        "longitud": lng
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response;

  } catch (error) {
    return error;
  }
};

//Get all paradas
export const getAllParadas = async () => {
  try {
    const response = await axios.get(
      createURL(['/parada/']),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response;

  } catch (error) {
    return error;
  }
};



export const deleteParadasById = async (id) => {
  try {
    const response = await axios.delete(
      createURL([`/parada/${id}`]),
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        }
      }
    );

    return response;

  } catch (error) {
    return error;
  }
};







