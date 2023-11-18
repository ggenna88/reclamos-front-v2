
import React from 'react';
import { useState } from 'react';
import Boton from './Boton';

const UnidadPersonasButton = ({ nro, piso, personas }) => {

    const [mostrarPersonas, setMostrarPersonas] = useState(false);

    const toggleMostrarPersonas = () => {
      setMostrarPersonas(!mostrarPersonas);
    };

    return (
        <div>
        <Boton label="Ver habitantes" onClick={toggleMostrarPersonas} />
        {mostrarPersonas && (
          <ul>
            {personas.map((persona) => (
              <li key={persona.id}>{persona.nombre}</li>
            ))}
          </ul>
        )}
      </div>
    );
};

export default UnidadPersonasButton;
