import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const FiltrosReclamos = ({ onFilter }) => {
  const [filtroTitulo, setFiltroTitulo] = useState('');
  const [filtroDescripcion, setFiltroDescripcion] = useState('');
  const [filtroTipoReclamo, setFiltroTipoReclamo] = useState('');
  const [filtroEstadoReclamo, setFiltroEstadoReclamo] = useState('');

  const handleFilter = () => {
    // Enviar los filtros al componente padre
    onFilter({
      filtroTitulo,
      filtroDescripcion,
      filtroTipoReclamo,
      filtroEstadoReclamo,
    });
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="filtroTitulo">
            <Form.Label>Título:</Form.Label>
            <Form.Control
              type="text"
              value={filtroTitulo}
              onChange={(e) => setFiltroTitulo(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="filtroDescripcion">
            <Form.Label>Descripción:</Form.Label>
            <Form.Control
              type="text"
              value={filtroDescripcion}
              onChange={(e) => setFiltroDescripcion(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="filtroTipoReclamo">
            <Form.Label>Tipo de Reclamo:</Form.Label>
            <Form.Control
              type="text"
              value={filtroTipoReclamo}
              onChange={(e) => setFiltroTipoReclamo(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="filtroEstadoReclamo">
            <Form.Label>Estado de Reclamo:</Form.Label>
            <Form.Control
              type="text"
              value={filtroEstadoReclamo}
              onChange={(e) => setFiltroEstadoReclamo(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Button variant="primary" onClick={handleFilter}>
            Filtrar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltrosReclamos;
