import React, { useState } from 'react';
import { Form, Button, Row, Col, Dropdown } from 'react-bootstrap';

const FiltrosReclamos = ({ onFilter, onClearFilters }) => {
  const [filtroEdificioId, setFiltroEdificioId] = useState('');
  const [filtroUserId, setFiltroUserId] = useState('');
  const [filtroTipoReclamo, setFiltroTipoReclamo] = useState('');
  const [filtroEstadoReclamo, setFiltroEstadoReclamo] = useState('');

  const handleFilter = () => {
    // Set default values explicitly to avoid sending undefined
    const userIdValue = filtroUserId !== '' ? filtroUserId : null;
    const buildingIdValue = filtroEdificioId !== '' ? filtroEdificioId : null;
    const tipoReclamoValue = filtroTipoReclamo || null;
    const estadoReclamoValue = filtroEstadoReclamo || null;

    // Enviar los filtros al componente padre
    onFilter({
      userId: userIdValue,
      buildingId: buildingIdValue,
      tipoReclamo: tipoReclamoValue,
      estadoReclamo: estadoReclamoValue,
    });
  };

  const handleClear = () => {
    setFiltroEdificioId('');
    setFiltroUserId('');
    setFiltroTipoReclamo('');
    setFiltroEstadoReclamo('');

    // Llamar a la función para limpiar los filtros
    onClearFilters();
  };

  return (
    <Form>
      <Row>
        <Col>
          <Form.Group controlId="formTipoReclamo">
            <Form.Label>Tipo de Reclamo:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-tipo-reclamo">
                {filtroTipoReclamo || 'Selecciona un tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFiltroTipoReclamo('PorUnidad')}>Por Unidad</Dropdown.Item>
                <Dropdown.Item onClick={() => setFiltroTipoReclamo('PorEspacioComun')}>Por Espacio Comun</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="filtroTipoReclamo">
            <Form.Label>Estado de Reclamo:</Form.Label>
            <Dropdown>
              <Dropdown.Toggle variant="light" id="dropdown-tipo-reclamo">
                {filtroEstadoReclamo || 'Selecciona un tipo'}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setFiltroEstadoReclamo('Nuevo')}>Nuevo</Dropdown.Item>
                <Dropdown.Item onClick={() => setFiltroEstadoReclamo('Actualizado')}>Actualizado</Dropdown.Item>
                <Dropdown.Item onClick={() => setFiltroEstadoReclamo('Desestimado')}>Desestimado</Dropdown.Item>
                <Dropdown.Item onClick={() => setFiltroEstadoReclamo('Cerrado')}>Cerrado</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="filtroUserId">
            <Form.Label>Id de Usuario:</Form.Label>
            <Form.Control
              type="text"
              value={filtroUserId}
              onChange={(e) => setFiltroUserId(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group controlId="filtroEdificioId">
            <Form.Label>Id de Edificio:</Form.Label>
            <Form.Control
              type="text"
              value={filtroEdificioId}
              onChange={(e) => setFiltroEdificioId(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col>
          <Button variant="primary" onClick={handleFilter}>
            Filtrar
          </Button>
        </Col>

        <Col>
          <Button variant="secondary" onClick={handleClear}>
            Limpiar Filtros
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FiltrosReclamos;
