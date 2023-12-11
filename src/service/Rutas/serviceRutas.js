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
export const saveRuta= async (paradas) => {
  try {
    const response = await axios.post(
      createURL(['/ruta/']),
      {
        "paradas": [],
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






