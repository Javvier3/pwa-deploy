import axios from "axios";
import { createURL } from "../../utils/environment";

const accessToken = localStorage.getItem('token');

export const getAllConductores= async () => {
  try {
    const response = await axios.get(
      createURL([`/conductor/`]),
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

export const getConductorById = async (id) => {
  try {
    const response = await axios.get(
      createURL([`/conductor/${id}`]),
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

export const updateConductorById = async (nombre, rfc, foto, puntuacion, correo, clave, bday,phone, id) => {
  try {
    const response = await axios.post(
      createURL(['/auth/conductor/']),
      {
        "idConductor": id,
        "nombre": nombre,
        "rfc": rfc,
        "fotoPerfil": foto,
        "puntuacion": puntuacion,
        "correo": correo,
        "clave": clave,
        "fechaNacimiento":bday,
        "numeroTelefono": phone,
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



//Create
export const saveOrUpdateConductor = async (nombre, rfc, foto, puntuacion, correo, clave, bday,phone) => {
  try {
    const response = await axios.post(
      createURL(['/auth/conductor/']),
      {
        "nombre": nombre,
        "rfc": rfc,
        "fotoPerfil": null,
        "puntuacion": 0,
        "correo": correo,
        "clave": clave,
        "fechaNacimiento":bday,
        "numeroTelefono": phone,
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


export const deleteConductorById = async (id) => {
  try {
    const response = await axios.delete(
      createURL([`/conductor/${id}`]),
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