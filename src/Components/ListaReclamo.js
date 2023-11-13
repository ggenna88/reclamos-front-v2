// ListaReclamo.js
import React, { useState, useEffect } from 'react';
import ReclamoCard from './ReclamoCard';

const ListaReclamo = ({ reclamos, onEdit, onDelete }) => {
  const [filtro, setFiltro] = useState('');

  // Divide los reclamos en grupos de 2 para asegurarse de que haya 2 elementos por fila
  const reclamosPorFila = reclamos.reduce((fila, reclamo, index) => {
    if (index % 2 === 0) {
      fila.push([reclamo]);
    } else {
      fila[fila.length - 1].push(reclamo);
    }
    return fila;
  }, []);

  return (
    <div className="container">
      <input
        type="text"
        placeholder="Filtrar por..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
      />
      {reclamosPorFila.map((fila, index) => (
        <div key={index} className="row justify-content-center mb-3">
          {fila.map((reclamo) => (
            <div key={reclamo.id} className="col-md-4">
              <ReclamoCard
                reclamo={reclamo}
                onEdit={onEdit}
                onDelete={onDelete}
                className="card mx-auto"
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ListaReclamo;
