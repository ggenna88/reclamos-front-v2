import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const AddEdificioForm = ({ onAddEdificio, handleClose }) => {
  const [direccion, setDireccion] = useState('');

  const handleDireccionChange = (e) => {
    setDireccion(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddEdificio(direccion);
    setDireccion('');
    handleClose(); // Cierra el modal después de agregar el edificio
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formDireccion">
        <Form.Label>Dirección:</Form.Label>
        <Form.Control type="text" value={direccion} onChange={handleDireccionChange} />
      </Form.Group>
      <Button type="submit">Agregar Edificio</Button>
    </Form>
  );
};

const AgregarEdificioModal = ({ show, handleClose, onAddEdificio }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Edificio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <AddEdificioForm onAddEdificio={onAddEdificio} handleClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
};

export default AgregarEdificioModal;
