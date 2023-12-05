import React, { useState } from "react";
import { loginFunction } from "../../service/auth/authService";
import "./Login.css";
import loginImg from "../../assets/images/loginImg.svg";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const logFn = async () => {
    await loginFunction(username, password)
      .then(res => {
        console.log(res.data.message);
        return res;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  };

  return (
    <div className="container">

      <div className="row vh-100" id="outerDiv">

        <div className="col-md-4 mb-5">

          <h1 className="PT">ViajaBara</h1>
          <h5 className="PD mb-2">Inicia sesión en tu cuenta</h5>

          <form>

            <div class="form-floating mb-3">
            <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="ejemplo@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label for="floatingInput" className="PDInput">Correo Electrónico</label>
            </div>

            <div class="form-floating mb-1">
            <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label  className="PDInput" for="floatingPassword">Contraseña</label>
            </div>

            <div className="text-center">
            <button type="button" className="btn btn-outline-primary mt-2" style={{ fontFamily: 'ProductSansRegular'}} onClick={logFn}>Iniciar sesión</button>
            </div>
            
            
          </form>
        </div>

        <div className="col-md-8">
          {/* <img src={loginImg} alt="" /> */}
        </div>

      </div>

    </div>
  );
};

export default Login;
