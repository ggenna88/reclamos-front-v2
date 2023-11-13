
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Boton from "./Boton";

const AdminEdificios = () => {
  console.log("entro a admin");
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  const handleEdificiosAll = () => {
    navigate('/edificiosall');
  };

  const handleEdificiosAdd = () => {
    navigate('/edificiosadd');
  };

  return (
    <div className="container">
      <h1>Administrar Edificios</h1>
      <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
        <Boton label="Ver edificios" onClick={handleEdificiosAll} />
        <Boton label="Agregar edificio" onClick={handleEdificiosAdd} />
      </div>
    </div>
  );
};

export default AdminEdificios;
