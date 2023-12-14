import React, { useState, useEffect } from "react";
import { loginFunction } from "../../service/auth/authService";
import "./Login.css";
import logoIMG from "../../assets/images/logoVB.png";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logoAnimation, setLogoAnimation] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setLogoAnimation(false);
    }, 1500);

    return () => clearTimeout(timeout);
  }, []);

  const logFn = async () => {
    try {
      const res = await loginFunction(username, password);
      console.log(res.data);

      if (res.data) {
        window.location.href = "/viajes";
      }

      return res;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return (
    <div className="container">
      <div className="row vh-100" id="outerDiv">
        <div className="col-md-4 mb-5">
          <h1 className="PT">ViajaBara</h1>
          <h5 className="PD mb-2">Inicia sesión en tu cuenta</h5>
          <form>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="ejemplo@gmail.com"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label htmlFor="floatingInput" className="PDInput">Correo Electrónico</label>
            </div>
            <div className="form-floating mb-1">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Escribe tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="PDInput" htmlFor="floatingPassword">Contraseña</label>
            </div>
            <div className="text-center">
              <button type="button" className="btn btn-outline-primary mt-2" style={{ fontFamily: 'ProductSansRegular' }} onClick={logFn}>Iniciar sesión</button>
            </div>
          </form>
        </div>

<div className="col-md-8 text-center">
  <div className={`logo-container ${logoAnimation ? 'logo-animation' : ''}`}>
    <img src={logoIMG} alt="Logo" style={{ width: '50%' }} />
  </div>
</div>


      </div>
    </div>
  );
};

export default Login;
