
import React, { useState, useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import fetchData from './FetchUtil';

const UnidadesAdd = () => {
  const { token } = useContext(AuthContext);
  const { edificioId } = useParams();
  const [numero, setNumero] = useState('');
  const [piso, setPiso] = useState('');
  const [estado, setEstado] = useState('Inhabitada');
  const navigate = useNavigate();

  const handleGuardarYContinuar = async () => {
    console.log(edificioId)
    try {
      const unidad = await fetchData(
        'http://localhost:8080/unidades/add',
        'POST',
        { nro: numero, piso, estado, edificioID: edificioId },
        token
      );

      console.log("Unidad creada con éxito", unidad);
      setNumero('');
      setPiso('');
      setEstado('Inhabitada');

    } catch (error) {
      console.error('Error:', error);
    }
  };


  const handleGuardarYFinalizar = async () => {

    try {
      const unidad = await fetchData(
        'http://localhost:8080/unidades/add',
        'POST',
        { nro: numero, piso, estado, edificioID: edificioId },
        token
      );

      console.log("Unidad creada con éxito", unidad);
      setNumero('');
      setPiso('');
      setEstado('Inhabitada');

    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/edificiosall');
  };

  return (
    <div className="container mt-4">
      <h1>Agregar Unidad</h1>
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
        <button type="button" className="btn btn-primary me-2" onClick={handleGuardarYContinuar}>
          Guardar y Continuar
        </button>
        <button type="button" className="btn btn-primary" onClick={handleGuardarYFinalizar}>
          Guardar y Finalizar
        </button>
      </form>
    </div>
  );
};

export default UnidadesAdd;
