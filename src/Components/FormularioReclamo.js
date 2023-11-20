import React, { useState, useEffect, useContext } from 'react';
import { Modal, Button, Form, Dropdown, Carousel } from 'react-bootstrap';
import ReclamoService from '../Services/ReclamoService';
import { AuthContext } from '../Context/AuthContext';

const FormularioReclamo = ({ onSubmit, onClose, reclamoEnEdicion }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoReclamo, setTipoReclamo] = useState('');
  const [actualizacion, setActualizacion] = useState('');
  const [userId, setUserId] = useState('');
  const [edificioId, setEdificioId] = useState('');
  const [estadoReclamo, setEstadoReclamo] = useState('Nuevo');
  const [reclamoId, setReclamoId] = useState('');
  const [imagenes, setImagenes] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    if (reclamoEnEdicion) {
      setTitulo(reclamoEnEdicion.titulo);
      setDescripcion(reclamoEnEdicion.descripcion);
      setTipoReclamo(reclamoEnEdicion.tipoReclamo);
      setActualizacion(reclamoEnEdicion.actualizacion);
      setUserId(reclamoEnEdicion.userid);
      setEdificioId(reclamoEnEdicion.edificioid);
      setEstadoReclamo(reclamoEnEdicion.estadoReclamo);
      setReclamoId(reclamoEnEdicion.reclamo_id);
      setImagenes(reclamoEnEdicion.imagenes || []);
    }
    const cargarImagenes = async () => {
      if (reclamoEnEdicion && reclamoEnEdicion.reclamo_id) {
        try {
          // Llama al servicio para obtener las imágenes del reclamo en edición
          const response = await ReclamoService({
            tipoLlamada: 'findImagesByReclamoId',
            parametros: { token: token, id: reclamoEnEdicion.reclamo_id },
          });

          if (response) {
            // Actualiza el estado local con las imágenes obtenidas
            setImagenes(response);
          }
        } catch (error) {
          console.error('Error al obtener imágenes del reclamo:', error);
        }
      }
    };
    cargarImagenes();
  }, [reclamoEnEdicion]);

  const handleEliminarImagen = async (id) => {
    try {
      // Llama al servicio para eliminar la imagen por su id
      await ReclamoService({
        tipoLlamada: 'deleteImageById',
        parametros: { id: id, token: token },
      });

      const response = await ReclamoService({
        tipoLlamada: 'findImagesByReclamoId',
        parametros: { token: token, id: reclamoEnEdicion.reclamo_id },
      });

      if (response) {
        // Actualiza el estado local con la nueva lista de imágenes
        setImagenes(response);
      }
    } catch (error) {
      console.error('Error al eliminar imagen:', error);
    }
  };

  const handleDescripcionImagenChange = (id, value) => {
    const nuevasImagenes = imagenes.map((imagen) =>
      imagen.id === id ? { ...imagen, descripcion: value } : imagen
    );
    setImagenes(nuevasImagenes);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log('Este es el file', file);

    if (file) {
      try {
        // Llama al servicio para subir la nueva imagen
        await ReclamoService({
          tipoLlamada: 'uploadImage',
          parametros: {
            imagen: {
              file,
              nombre: `imagen${imagenes.length + 1}`,
              descripcion: '',
              id_reclamo: reclamoEnEdicion.reclamo_id,
            }, token: token
          },
        });

        // Después de cargar la imagen, realiza una nueva llamada para obtener la lista actualizada de imágenes
        const response = await ReclamoService({
          tipoLlamada: 'findImagesByReclamoId',
          parametros: { token: token, id: reclamoEnEdicion.reclamo_id },
        });

        if (response) {
          // Actualiza el estado local con la nueva lista de imágenes
          setImagenes(response);
        }
      } catch (error) {
        console.error('Error al subir imagen:', error);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      titulo,
      descripcion,
      tipoReclamo,
      actualizacion,
      userId,
      edificioId,
      estadoReclamo,
      reclamoId,
      imagenes
    });

    // Resto del código para limpiar los estados y cerrar el modal
    setTitulo('');
    setDescripcion('');
    setTipoReclamo('');
    setActualizacion('');
    setUserId('');
    setEdificioId('');
    setEstadoReclamo('');
    setReclamoId('');
    setImagenes([]);
    onClose();
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{reclamoEnEdicion ? 'Editar Reclamo' : 'Nuevo Reclamo'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formUserId">
            <Form.Label>ID Usuario:</Form.Label>
            <Form.Control
              type="text"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formEdificioId">
            <Form.Label>ID Edificio:</Form.Label>
            <Form.Control
              type="text"
              value={edificioId}
              onChange={(e) => setEdificioId(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTitulo">
            <Form.Label>Título:</Form.Label>
            <Form.Control
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formDescripcion">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              as="textarea"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formTipoReclamo">
            <Form.Label>Tipo de Reclamo:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-tipo-reclamo">
                {tipoReclamo || 'Selecciona un tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setTipoReclamo('PorUnidad')}>PorUnidad</Dropdown.Item>
                <Dropdown.Item onClick={() => setTipoReclamo('PorEspacioComun')}>PorEspacioComun</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group controlId="formEstadoReclamo">
            <Form.Label>Estado de Reclamo:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-tipo-reclamo">
                {estadoReclamo || 'Selecciona un tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setEstadoReclamo('Nuevo')}>Nuevo</Dropdown.Item>
                <Dropdown.Item onClick={() => setEstadoReclamo('Actualizado')}>Actualizado</Dropdown.Item>
                <Dropdown.Item onClick={() => setEstadoReclamo('Desestimado')}>Desestimado</Dropdown.Item>
                <Dropdown.Item onClick={() => setEstadoReclamo('Cerrado')}>Cerrado</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
          <Form.Group controlId="formActualizacion">
            <Form.Label>Actualización:</Form.Label>
            <Form.Control
              as="textarea"
              value={actualizacion}
              onChange={(e) => setActualizacion(e.target.value)}
            />
          </Form.Group>
                  {reclamoEnEdicion ? (
          <Form.Group controlId="formImagenes">
            <Form.Label>Imágenes:</Form.Label>
            <Carousel nextLabel="Siguiente" prevLabel="Anterior" style={{ color: 'black' }}>
              {imagenes.map((imagen) => (
                <Carousel.Item key={imagen.id}>
                  {imagen.datosImagen ? (
                    <>
                      {/* Imagen */}
                      <img
                        className="d-block w-100"
                        src={`data:image/jpeg;base64,${imagen.datosImagen}`}
                        alt={`Imagen ${imagen.id}`}
                        style={{ backgroundColor: 'black' }}
                      />
                      <div style={{ marginTop: '10px' }}>
                      </div>
                    </>
                  ) : null}
                </Carousel.Item>
              ))}
            </Carousel>
            <Button
              variant="danger"
              size="sm"
              onClick={() => handleEliminarImagen(imagenes[0].id)} // Ajusta la lógica según tus necesidades
              style={{ position: 'absolute', bottom: '10px', right: '10px', zIndex: 1 }}
            >
              Eliminar
            </Button>
            <Form.Group controlId="formFile" style={{ marginTop: '10px' }}>
              <Form.Label>Subir nueva imagen:</Form.Label>
              <input type="file" onChange={handleFileChange} />
            </Form.Group>
          </Form.Group>
        ) : null}
          <div style={{ marginTop: '15px', display: 'flex', justifyContent: 'space-between' }}>
            <Button variant="primary" type="submit">
              {reclamoEnEdicion ? 'Actualizar' : 'Crear'}
            </Button>
            {/* Eliminar el botón de cerrar */}
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioReclamo;
