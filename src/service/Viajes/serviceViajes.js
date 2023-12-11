import axios from "axios";
import { createURL } from "../../utils/environment";

const accessToken = localStorage.getItem('token');

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






