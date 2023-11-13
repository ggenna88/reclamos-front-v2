import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const DetalleUnidades = () => {
  const { direccion } = useParams();
  const [unidades, setUnidades] = useState([]);

  // Lógica para obtener y mostrar detalles de unidades para el edificio con el id proporcionado

  return (
    <div>
      <h1>Detalle de Unidades</h1>
      {/* Mostrar detalles de unidades aquí */}
    </div>
  );
};

export default DetalleUnidades;
