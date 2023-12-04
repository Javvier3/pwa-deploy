import React from "react";
import "./Login.css";
import { loginFunction } from "../../service/auth/authService";

const Login = () => {

  const logFn = async ()=>{
    console.log("Hola chavales")
    const response = await loginFunction('daveOG@outlook.com','root123')
      .then(res=>console.log(res))
      .catch(error=>console.log(error))
  }


  return (
    
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
        <label htmlFor="username">Usuario:</label>
        <input type="text" id="username" name="username" />

        <label htmlFor="password">Contraseña:</label>
        <input type="password" id="password" name="password" />

        <button type="button" onClick={logFn}>Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
