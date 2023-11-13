
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Boton from "./Boton";

const AdminUsuarios = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  const handleUsersAll = () => {
    navigate('/usersall');
  };

  return (
    <div className="container">
      <h1>Administrar Usuarios</h1>
      <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
        <Boton label="Ver usuarios" onClick={handleUsersAll} />
      </div>
    </div>
  );
};

export default AdminUsuarios;
