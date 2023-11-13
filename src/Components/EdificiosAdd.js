import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';

const EdificiosAdd = () => {
  const { token } = useContext(AuthContext);
  const [direccion, setDireccion] = useState('');

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
        console.log("Edificio creado correctamente");
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
