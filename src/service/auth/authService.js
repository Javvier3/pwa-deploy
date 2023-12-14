import axios from "axios";
import { createURL } from "../../utils/environment";

export const loginFunction = async (correo, clave) => {
  try {
    const response = await axios.post(
      createURL(['/auth/login']),
      {
        correo: correo,
        clave: clave
      },
      {
        headers: {
          'Content-Type': 'application/json',
        }
      }
    );

    //Store the token
    localStorage.setItem('token', response.data.object.usuario.token)

    return response;
  } catch (error) {
    return error;
  }
};


