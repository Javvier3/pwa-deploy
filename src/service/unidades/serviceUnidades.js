import axios from "axios";
import { createURL } from "../../utils/environment";

const accessToken = localStorage.getItem('token');


export const getAllVehiculos= async () => {
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


//Create
export const saveVehiculo= async (anio,marca,modelo,carro,num_asientos,alias) => {
  try {
    const response = await axios.post(
      createURL(['/vehiculo/']),
      {
        "anio": anio,
        "marca": marca,
        "modelo": modelo,
        "tipo": carro,
        "numAsientos": num_asientos,
        "alias": alias
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



// borrar vehiculo 
export const deleteVehiculoById= async (id) => {
  try {
    const response = await axios.delete(
      createURL([`/vehiculo/${id}`]),
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



// borrar vehiculo 
export const getVehiculoById= async (id) => {
  try {
    const response = await axios.get(
      createURL([`/vehiculo/${id}`]),
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



//update
export const updateVehiculo= async (anio,marca,modelo,carro,num_asientos,alias, id) => {
  try {
    const response = await axios.post(
      createURL(['/vehiculo/']),
      {
        "idVehiculo": id,
        "anio": anio,
        "marca": marca,
        "modelo": modelo,
        "tipo": carro,
        "numAsientos": num_asientos,
        "alias": alias
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





