// FormularioReclamo.js
import React, { useState } from 'react';

const FormularioReclamo = ({ onSubmit }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validar y enviar reclamo al onSubmit
    onSubmit({ titulo, descripcion });
    // Limpiar el formulario después de enviar
    setTitulo('');
    setDescripcion('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Título:</label>
      <input
        type="text"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
      />
      <label>Descripción:</label>
      <textarea
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
      />
      <button type="submit">Guardar</button>
    </form>
  );
};

export default FormularioReclamo;