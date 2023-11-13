
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import Boton from "./Boton";

const MenuAdmin = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/');
    }
  }, [token]);

  const handleAdminEdificiosClick = () => {
    navigate('/admin-edificio');
  };

  const handleAdminUsuariosClick = () => {
    navigate('/admin-usuarios');
  };

  const handleAdminReclamosClick = () => {
    navigate('/admin-reclamos');
  };

  return (
    <div className="container">
      <h1>Menú de administrador</h1>
      <div className="btn-group-vertical" role="group" aria-label="Vertical button group">
        <Boton label="Administrar edificios" onClick={handleAdminEdificiosClick} />
        <Boton label="Administrar usuarios" onClick={handleAdminUsuariosClick} />
        <Boton label="Administrar reclamos" onClick={handleAdminReclamosClick} />
      </div>
    </div>
  );
};

export default MenuAdmin;
