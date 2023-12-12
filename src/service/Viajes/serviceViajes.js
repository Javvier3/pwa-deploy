import axios from "axios";
import { createURL } from "../../utils/environment";

const accessToken = localStorage.getItem('token');



export const insertNewViaje = async (fechaViaje,nombre, ruta, vehiculo, conductor  ) => {
  try {
    const response = await axios.post(
      createURL(['/viajes/']),
      {
        "fechaViaje": fechaViaje,
        "nombre": nombre,
        "num_asientos_disponibles": 0,
        "ruta":ruta,
        "vehiculo": vehiculo,
        "conductor": conductor
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




export const updateViajeById = async (fechaViaje,nombre, ruta, vehiculo, conductor,id  ) => {
  try {
    const response = await axios.post(
      createURL(['/viajes/']),
      {
        "idViaje": id,
        "fechaViaje": fechaViaje,
        "nombre": nombre,
        "num_asientos_disponibles": 0,
        "ruta":ruta,
        "vehiculo": vehiculo,
        "conductor": conductor
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






//Get all viajes
export const getAllViajes = async () => {
  try {
    const response = await axios.get(
      createURL(['/viajes/']),
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


export const getViajeById = async (id) => {
  try {
    const response = await axios.get(
      createURL([`/viajes/${id}`]),
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


export const deleteViajeById = async (id) => {
  try {
    const response = await axios.delete(
      createURL([`/viajes/${id}`]),
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















