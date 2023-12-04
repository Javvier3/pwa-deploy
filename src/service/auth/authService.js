import axios from "axios";
import { createURL } from "../../utils/environment";


export const loginFunction = async (correo,clave)=>{

    const response = await axios.post(createURL(['/api/login']),
        {
            correo: correo,
            clave: clave
        },
        {
            headers: "Content-Type:application/json"
        }
    ).then(res=>res.json())
    .catch(error=>console.log(error));
}



