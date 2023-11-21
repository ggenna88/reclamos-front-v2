import React, { useState, useEffect, useContext } from "react";
import ListaReclamo from "./ListaReclamo";
import FormularioReclamo from "./FormularioReclamo";
import "./App2.css";
import ReclamoService from "../Services/ReclamoService";
import  useAuth  from "../hooks/useAuth";
import FiltrosReclamos from "./FiltrosReclamos";

const GestionReclamos = () => {
  const  token  = useAuth();
  const [reclamos, setReclamos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [reclamoEnEdicion, setReclamoEnEdicion] = useState(null);
  const  userRole  = 'tenant';
  const  userId  = 2;

  useEffect(() => {
    const fetchData = async () => {
      console.log("entro aqui 3", userRole)
      console.log("entro aqui 2", userId)
      try {
        let reclamosData;
        if (userRole === 'admin' || userRole === 'employee') {
          console.log("entro aqui 1")
          reclamosData = await ReclamoService({
            tipoLlamada: 'obtenerReclamos',
            parametros: { token },
          });
        } else if (userRole === 'tenant' || userRole === 'owner') {
          // Si el usuario es inquilino o propietario, aplicar filtro por userId
          console.log("entro aqui 2")
          reclamosData = await ReclamoService({
            tipoLlamada: 'filterReclamos',
            parametros: { token, filtros: { userId:userId } },
          });
          
        }

        setReclamos(reclamosData || []);
      } catch (error) {
        console.error("Error al obtener reclamos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [token, userRole, userId]);

  const handleEdit = async (id) => {
    try {
      console.log("Este es el ID de handleEdit", id);
      const reclamoDetalles = await ReclamoService({
        tipoLlamada: "buscarReclamoId",
        parametros: { id, token },
      });
      setReclamoEnEdicion(reclamoDetalles);
      setShowModal(true);
    } catch (error) {
      console.error("Error al obtener detalles del reclamo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await ReclamoService({
        tipoLlamada: "deleteReclamoId",
        parametros: { id, token },
      });
  
      if (userRole === 'admin' || userRole === 'employee') {
        const reclamosData = await ReclamoService({
          tipoLlamada: 'obtenerReclamos',
          parametros: { token },
        });
        setReclamos(reclamosData);
      } else {
        // Si el usuario no es admin o empleado, solo actualizar la lista si es necesario
        setReclamos((prevReclamos) =>
          prevReclamos.filter((reclamo) => reclamo.reclamo_id !== id)
        );
      }
    } catch (error) {
      console.error("Error al eliminar reclamo:", error);
    }
  };
  
  const handleSubmit = async (nuevoReclamo) => {
    try {
      if (reclamoEnEdicion) {
        await ReclamoService({
          tipoLlamada: "actualizarReclamo",
          parametros: {
            token,
            nuevoReclamo,
          },
        });
      } else {
        await ReclamoService({
          tipoLlamada: "crearReclamo",
          parametros: { token, nuevoReclamo },
        });
      }
  
      if (userRole === 'admin' || userRole === 'employee') {
        const reclamosData = await ReclamoService({
          tipoLlamada: 'obtenerReclamos',
          parametros: { token },
        });
        setReclamos(reclamosData);
      } else {
        // Si el usuario no es admin o empleado, solo actualizar la lista si es necesario
        if (reclamoEnEdicion) {
          // Actualizar el reclamo editado en la lista
          setReclamos((prevReclamos) =>
            prevReclamos.map((reclamo) =>
              reclamo.reclamo_id === nuevoReclamo.reclamo_id
                ? nuevoReclamo
                : reclamo
            )
          );
        } else {
          // Agregar el nuevo reclamo a la lista
          setReclamos((prevReclamos) => [...prevReclamos, nuevoReclamo]);
        }
      }
  
      setReclamoEnEdicion(null);
      setShowModal(false);
    } catch (error) {
      console.error("Error al crear o actualizar reclamo:", error);
    }
  };

  const openModal = () => {
    setShowModal(true);
    setReclamoEnEdicion(null);
  };

  const closeModal = () => {
    setShowModal(false);
    setReclamoEnEdicion(null);
  };

  const handleFilter = async (filtros) => {
    try {
      // Provide default values for the parameters to avoid sending undefined
      const {
        userId = null,
        buildingId = null,
        state = null,
        type = null,
      } = filtros;
      console.log("Estos son los filtros en Gestion", filtros);

      const reclamosData = await ReclamoService({
        tipoLlamada: "filterReclamos",
        parametros: { token, filtros },
      });
      if (reclamosData) {
        setReclamos(reclamosData);
      } else {
        console.log("No se encontraron reclamos.");
        setReclamos([]);
      }
    } catch (error) {
      console.error("Error al aplicar filtros:", error);
    }
  };

  const handleClearFilters = async () => {
    try {
      // Limpiar los filtros y obtener todos los reclamos de nuevo
      const reclamosData = await ReclamoService({
        tipoLlamada: "obtenerReclamos",
        parametros: { token },
      });
      setReclamos(reclamosData || []);
    } catch (error) {
      console.error("Error al limpiar filtros:", error);
    }
  };

  return (
    <div className="gestion-reclamos">
      <div className="main-content">
        <h2 className="titulo">Gestión de Reclamos</h2>
        <div className="btn-nuevo-reclamo-container">
          <button className="btn-nuevo-reclamo" onClick={openModal}>
            Nuevo Reclamo
          </button>
        </div>
        {showModal && (
          <FormularioReclamo
            onSubmit={handleSubmit}
            onClose={closeModal}
            reclamoEnEdicion={reclamoEnEdicion}
          />
        )}
        <div className="grid-container">
          <div className="filtros-container">
            <FiltrosReclamos
              onFilter={handleFilter}
              onClearFilters={handleClearFilters}
            />
          </div>
          {loading ? (
            <div className="lista-reclamos-container">Cargando reclamos...</div>
          ) : (
            <>
              {reclamos.length > 0 ? (
                <ListaReclamo
                  reclamos={reclamos}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                <div className="lista-reclamos-container">
                  No existen reclamos.
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GestionReclamos;
