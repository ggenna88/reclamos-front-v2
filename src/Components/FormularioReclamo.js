import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Dropdown } from 'react-bootstrap';

const FormularioReclamo = ({ onSubmit, onClose, reclamoEnEdicion }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoReclamo, setTipoReclamo] = useState('');
  const [actualizacion, setActualizacion] = useState('');
  const [userId, setUserId] = useState('');
  const [edificioId, setEdificioId] = useState('');
  const [estadoReclamo, setEstadoReclamo] = useState('Nuevo');
  const [reclamoId, setReclamoId] = useState('');

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
    }
  }, [reclamoEnEdicion]);

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
      reclamoId
    });

    setTitulo('');
    setDescripcion('');
    setTipoReclamo('');
    setActualizacion('');
    setUserId('');
    setEdificioId('');
    setEstadoReclamo('');
    setReclamoId('');
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
          <Button variant="success" type="submit">
            {reclamoEnEdicion ? 'Actualizar' : 'Crear'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default FormularioReclamo;
