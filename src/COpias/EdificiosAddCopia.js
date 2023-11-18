//EdificiosAdd.js

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import BackButton from './BackButton';

const EdificiosAdd = () => {
  const { token } = useContext(AuthContext);
  const [direccion, setDireccion] = useState('');
  const navigate = useNavigate();

  const handleDireccionChange = (event) => {
    setDireccion(event.target.value);
  };

  const handleAgregarEdificio = async () => {
    try {
      const response = await fetch('http://localhost:8080/edificios/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ direccion }), // Enviar la dirección como parte del cuerpo de la solicitud
      });

      if (response.ok) {
        const edificioId = await response.text();
        console.log("Edificio creado correctamente con ID", edificioId);
        navigate(`/edificios/${edificioId}/agregar-unidad`);
      } else {
        console.error('Error al crear el edificio:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // Puedes realizar alguna lógica adicional si es necesario al cargar el componente
  }, []);

  return (
    <div className="container mt-4">
      <h1>Agregar Edificio</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="direccion" className="form-label">
            Dirección del Edificio:
          </label>
          <input
            type="text"
            className="form-control"
            id="direccion"
            value={direccion}
            onChange={handleDireccionChange}
          />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleAgregarEdificio}>
          Agregar Edificio
        </button>
      </form>
      <div className='text-center mt-3'>
        <BackButton />
      </div>

    </div>
  );
};



export default EdificiosAdd;
