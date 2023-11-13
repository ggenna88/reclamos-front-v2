
import React, { useState } from 'react';

const AddEdificioForm = ({ onAddEdificio }) => {
  const [direccion, setDireccion] = useState('');

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEdificio(direccion);
    setDireccion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Dirección:
        <input type="text" value={direccion} onChange={handleDireccionChange} />
      </label>
      <button type="submit">Agregar Edificio</button>
    </form>
  );
};

export default AddEdificioForm;
