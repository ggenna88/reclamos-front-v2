import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';
import BackButton from './BackButton';

const EdificiosUpdate = () => {
    const { id, direccion } = useParams();
    const { token } = useContext(AuthContext);
    const [newdireccion, setNewDireccion] = useState('');
    const navigate = useNavigate();
  
    const handleDireccionChange = (event) => {
      setNewDireccion(event.target.value);
    };
  
    const handleModificarEdificio = async () => {
      try {
        const response = await fetch(`http://localhost:8080/edificios/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ direccion: newdireccion }), // Utilizar newdireccion aquí
        });
  
        if (response.ok) {
          console.log("Edificio modificado correctamente");
          navigate(-1);
        } else {
          console.error('Error al modificar el edificio:', response.status);
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
        <h1>Modificar edificio {direccion}</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Dirección del Edificio:
            </label>
            <input
              type="text"
              className="form-control"
              id="direccion"
              onChange={handleDireccionChange}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleModificarEdificio}>
            Modificar Edificio
          </button>
        </form>
        <div className='text-center mt-3'>
          <BackButton/>
      </div>
      </div>
    );
  };



export default EdificiosUpdate;
