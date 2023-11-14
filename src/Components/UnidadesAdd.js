
import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';
import fetchData from './FetchUtil';

const UnidadesAdd = () => {
  const { token } = useContext(AuthContext);
  const { edificioId } = useParams();
  const [numero, setNumero] = useState('');
  const [piso, setPiso] = useState('');
  const [estado, setEstado] = useState('');
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
      setEstado('');

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
      setEstado('');

    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/edificiosall');
  };

  return (
    <div>
      <h1>Agregar Unidad</h1>
      <label>
        Número:
        <input type="text" value={numero} onChange={(e) => setNumero(e.target.value)} />
      </label>
      <label>
        Piso:
        <input type="text" value={piso} onChange={(e) => setPiso(e.target.value)} />
      </label>
      <label>
        Estado:
        <select value={estado} onChange={(e) => setEstado(e.target.value)}>
          <option value="Alquilada">Alquilada</option>
          <option value="HabitadaPorDuenio">Habitada por dueño</option>
          <option value="Inhabitada">Inhabitada</option>
        </select>
      </label>
      {/* Puedes agregar más campos para otras propiedades de la unidad si es necesario */}
      <button onClick={handleGuardarYContinuar}>Guardar y Continuar</button>
      <button onClick={handleGuardarYFinalizar}>Guardar y Finalizar</button>
    </div>
  );
};

export default UnidadesAdd;
