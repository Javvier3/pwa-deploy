import axios from "axios";
import { createURL } from "../../utils/environment";

const accessToken = localStorage.getItem('token');


export const getAllVehiculos= async () => {
    console.log(accessToken)
  try {
    const response = await axios.get(
      createURL([`/vehiculo/`]),
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
