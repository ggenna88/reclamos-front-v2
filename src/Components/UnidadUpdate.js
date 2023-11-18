import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate, useParams } from "react-router-dom";
import BackButton from './BackButton';

const UnidadUpdate = () => {
    const { id } = useParams();
    const { token } = useContext(AuthContext);
    const [numero, setNumero] = useState('');
    const [piso, setPiso] = useState('');
    const [estado, setEstado] = useState('Inhabitada');
    const navigate = useNavigate();
  

    const handleModificarUnidad = async () => {
        console.log("id: dasda", id)
      try {
        const response = await fetch(`http://localhost:8080/unidades/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ 
            nro: numero,
            piso: piso,
            estado: estado
           }), 
        });
  
        if (response.ok) {
          console.log("Unidad modificada correctamente");
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
        <h1>Modificar Unidad</h1>
        <form>
          <div className="mb-3">
            <label htmlFor="numero" className="form-label">
              Número:
            </label>
            <input
              type="text"
              className="form-control"
              id="numero"
              value={numero}
              onChange={(e) => setNumero(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="piso" className="form-label">
              Piso:
            </label>
            <input
              type="text"
              className="form-control"
              id="piso"
              value={piso}
              onChange={(e) => setPiso(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="estado" className="form-label">
              Estado:
            </label>
            <select
              className="form-select"
              id="estado"
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
            >
              <option value="Inhabitada">Inhabitada</option>
              <option value="Alquilada">Alquilada</option>
              <option value="HabitadaPorDuenio">Habitada por dueño</option>
            </select>
          </div>
          <button type="button" className="btn btn-primary me-2" onClick={handleModificarUnidad}>
            Guardar y Continuar
          </button>
        </form>
        <div className='text-center mt-3'>
          <BackButton/>
      </div>
      </div>
    );
  };



export default UnidadUpdate;
