



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
            titulo: "el reclamo numero 7",
            userid: 1,
            descripcion: "aca sucedio esto",
            estadoReclamo: "Nuevo",
            tipoReclamo: "PorEspacioComun",
            actualizacion: "aca se actualizo esto",
            edificioid: 1,
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
          const requestBodyActualizarReclamo = {
            titulo: "el reclamo numero 88",
            userid: 1,
            descripcion: "aca sucedio esto",
            estadoReclamo: "Nuevo",
            tipoReclamo: "PorEspacioComun",
            actualizacion: "aca se actualizo esto",
            edificioid: 1,
          };
          const baseUrlActualizarReclamo = `${baseURL}/reclamo/patch/${parametros.id}`;
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
