import React from "react";
import { useNavigate } from "react-router-dom";
import Boton from "./Boton";

const UnidadesAddButton = ({edificioId}) => {
  const navigate = useNavigate();
  const handleAddUnidad = () => {
    navigate(`/edificios/${edificioId}/agregar-unidad`);
  };

  return <Boton label="Agregar Unidades" onClick={handleAddUnidad} />;
};

export default UnidadesAddButton;
