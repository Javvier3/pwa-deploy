import axios from "axios";
import { createURL } from "../../utils/environment";

const accessToken = localStorage.getItem('token');

//Get ruta by id
export const retrieveRutas = async (id) => {
  try {
    const response = await axios.get(
      createURL([`/ruta/${id}`]),
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


//Create
export const saveRuta= async (paradasArray) => {
  try {
    const response = await axios.post(
      createURL(['/ruta/']),
      {
        "paradas": paradasArray,
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

export const saveRutaByIdRuta= async (id, paradasArray) => {
  try {
    const response = await axios.post(
      createURL(['/ruta/']),
      {
        "idRuta": id,
        "paradas": paradasArray,
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


//Get ruta by id
export const deleteRutaById = async (id) => {
  try {
    const response = await axios.delete(
      createURL([`/ruta/${id}`]),
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




