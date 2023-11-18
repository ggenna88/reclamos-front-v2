import React, { useContext, useState } from "react";
import LoginService from "../Services/LoginService";
import { useAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const { updateToken } = useAuth();
  const navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [password, setPassword] = useState("");

  function handlerUserChange(event) {
    setUsername(event.target.value);
  }

  function handlerPasswordChange(event) {
    setPassword(event.target.value);
  }

  const handleLogin = async (username, password) => {
    try {
      const token = await LoginService(username, password);
      console.log(token);
      if (token) {
        const [, payload] = token.split(".");
        const decodedPayload = JSON.parse(atob(payload));
        // Acceder al claim "rol" en la carga útil
        const permiso = decodedPayload.role[0].authority;
        const usuario = decodedPayload.sub;
        updateToken(token, permiso, usuario);
        console.log("Login successful, token:", token);
        console.log("Login successful, permiso:", permiso);
        console.log("Login successful, usuario:", usuario);

        // Navigate to the "/usersall" route
        navigate("/usersall");
      } else {
        // Handle the case where the token is not received (show an error message, etc.)
        throw new Error("Token not received");
      }
    } catch (error) {
      // Handle errors from LoginService or other parts of the login process
      console.error("Login error:", error);

      Swal.fire(
        "Error de validacion",
        "Username o password incorrecto",
        "error"
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await handleLogin(username, password);
  };

  return (
    <div className="modal" tabIndex="-1" style={{ display: "block" }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login</h5>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="modal-body">
              <input
                className="form-control my-3 w-75"
                type="username"
                placeholder="Usuario"
                value={username}
                onChange={handlerUserChange}
              ></input>
              <input
                className="form-control my-3 w-75"
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={handlerPasswordChange}
              ></input>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                style={{ float: "right" }}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
