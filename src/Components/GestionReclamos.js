// ReclamosProvider.js
import React, { useState, useEffect, useContext, createContext } from 'react';
import ListaReclamo from './ListaReclamo';
import FormularioReclamo from './FormularioReclamo';
import './App.css';
import ReclamoService from '../Services/ReclamoService';
import { AuthContext } from "../Context/AuthContext";
// Crear contexto

const GestionReclamos = () => {
  const { token } = useContext(AuthContext);
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reclamosData = await ReclamoService({ tipoLlamada: 'obtenerReclamos', parametros: { token } });
        setReclamos(reclamosData);
      } catch (error) {
        console.error('Error al obtener reclamos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token]);

  const handleEdit = (id) => {
    // Lógica para editar reclamo
  };

  const handleDelete = (id) => {
    // Lógica para eliminar reclamo
  };

  const handleSubmit = (nuevoReclamo) => {
    // Lógica para agregar reclamo
  };

  return (
    <div className="gestion-reclamos">
      <h2>Gestión de Reclamos</h2>
      <FormularioReclamo onSubmit={handleSubmit} />
      {loading ? (
        <div className="lista-reclamos-container">Cargando reclamos...</div>
      ) : (
        <ListaReclamo
          reclamos={reclamos}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default GestionReclamos;