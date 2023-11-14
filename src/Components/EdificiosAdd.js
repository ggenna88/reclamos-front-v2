import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";

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
    <div>
      <h1>Agregar Edificio</h1>
      <label>
        Dirección del Edificio:
        <input type="text" value={direccion} onChange={handleDireccionChange} />
      </label>
      <button onClick={handleAgregarEdificio}>Agregar Edificio</button>
      {/* Puedes mostrar la lista de edificios aquí si lo deseas */}
    </div>
  );
};



export default EdificiosAdd;
