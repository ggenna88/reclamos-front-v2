import React, { useContext, useState } from "react";
import LoginService from "../Services/LoginService";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login() {
  const { updateToken } = useContext(AuthContext);
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
    const { token } = await LoginService(username, password);

    if (token) {
      updateToken(token);
      console.log("Login exitoso, token:", token);
      navigate("/usersall");
    }
    //else{
      // Swal.fire(
      //   "Error de validacion",
      //   "Username o password incorrecto",
      //   "error"
      // );
   // }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    handleLogin(username, password);
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
