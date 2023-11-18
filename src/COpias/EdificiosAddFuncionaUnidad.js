//EdificiosAdd.js con modal y funciona unidad pero sin el modal

import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from "react-router-dom";
import { Modal, Button, Form } from 'react-bootstrap';

const EdificiosAdd = ({ onClose }) => {
  const { token } = useContext(AuthContext);
  const [direccion, setDireccion] = useState('');
  const navigate = useNavigate();


  const handleAgregarEdificio = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/edificios/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ direccion }), // Enviar la dirección como parte del cuerpo de la solicitud
      });

      if (response.ok) {
        const edificioId = await response.text();
        console.log("Edificio creado correctamente con ID", edificioId);
        navigate(`/edificios/${edificioId}/agregar-unidad`);
      } else {
        console.error('Error al crear el edificio:', response.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Nuevo edificio</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAgregarEdificio}>
          <Form.Group controlId="formDireccion">
            <Form.Label>Dirección:</Form.Label>
            <Form.Control
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </Form.Group>
          <div className="text-center mt-2">
            <Button type="submit">
              Agregar edificio
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};



export default EdificiosAdd;
