



const ReclamoService = async ({ tipoLlamada, parametros }) => {
  const baseURL = 'http://localhost:8080'; // Replace with your API URL
  const bearer = "Bearer " + parametros.token;


    try {
      let response;

      switch (tipoLlamada) {
        case 'obtenerReclamos':
          response = await fetch(`${baseURL}/reclamo/all`, {
            method: "GET",
            headers: {
              Authorization: bearer,
              "Content-Type": "application/json",
            },
          });
          const dataObtenerReclamos = await response.json();
          console.log(dataObtenerReclamos);
          return dataObtenerReclamos;
          break;

        case 'crearReclamo':
          const requestBodyCrearReclamo = {
            reclamo_id:0,
            titulo: parametros.nuevoReclamo.titulo,
            userid: parametros.nuevoReclamo.userId,
            descripcion: parametros.nuevoReclamo.descripcion,
            estadoReclamo: parametros.nuevoReclamo.estadoReclamo,
            tipoReclamo: parametros.nuevoReclamo.tipoReclamo,
            actualizacion: parametros.nuevoReclamo.actualizacion,
            edificioid: parametros.nuevoReclamo.edificioId
          };
          response = await fetch(`${baseURL}/reclamo/add`, {
            method: "POST",
            headers: {
              Authorization: bearer,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBodyCrearReclamo),
          });
          if (response.ok) {
            console.log("CreacionExitosa");
            return null;
          }
          break;

        case 'buscarReclamoId':
          const baseUrlBuscarReclamoId = `${baseURL}/reclamo/findbyid/${parametros.id}`;
          response = await fetch(baseUrlBuscarReclamoId, {
            method: "GET",
            headers: {
              Authorization: bearer,
              "Content-Type": "application/json",
            },
          });
          const dataBuscarReclamoId = await response.json();
          console.log(dataBuscarReclamoId);
          return dataBuscarReclamoId;
          break;

        case 'deleteReclamoId':
          const baseUrlDeleteReclamoId = `${baseURL}/reclamo/deletebyid/${parametros.id}`;
          response = await fetch(baseUrlDeleteReclamoId, {
            method: "DELETE",
            headers: {
              Authorization: bearer,
              "Content-Type": "application/json",
            },
          });
          if (response.ok) {
            console.log("DeleteExitoso");
            return null
          }
          break;

        case 'actualizarReclamo':
          console.log('Este es el reclamo en handleSubmit', parametros.nuevoReclamo)
          const requestBodyActualizarReclamo = {
            reclamo_id:parametros.nuevoReclamo.reclamoId,
            titulo: parametros.nuevoReclamo.titulo,
            userid: parametros.nuevoReclamo.userId,
            descripcion: parametros.nuevoReclamo.descripcion,
            estadoReclamo: parametros.nuevoReclamo.estadoReclamo,
            tipoReclamo: parametros.nuevoReclamo.tipoReclamo,
            actualizacion: parametros.nuevoReclamo.actualizacion,
            edificioid: parametros.nuevoReclamo.edificioId
          };
          const baseUrlActualizarReclamo = `${baseURL}/reclamo/patch/${parametros.nuevoReclamo.reclamoId}`;
          response = await fetch(baseUrlActualizarReclamo, {
            method: "PATCH",
            headers: {
              Authorization: bearer,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(requestBodyActualizarReclamo),
          });
          if (response.ok) {
            console.log("UpdateExitoso");
            return null;
          }
          break;

        default:
          console.error('Tipo de llamada no válido');
          break;
      }
    } catch (error) {
      console.error('Error al realizar la llamada:', error);
    }

    return null;
  };


 

export default ReclamoService;
