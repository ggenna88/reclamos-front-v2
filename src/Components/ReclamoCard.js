// ReclamoCard.js
import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ReclamoCard({ reclamo }) {
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{reclamo.titulo}</Card.Title>
        <Card.Text>{reclamo.descripcion}</Card.Text>
        <Card.Text>Estado: {reclamo.estadoReclamo}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="primary">Editar</Button>
          <Button variant="danger">Eliminar</Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ReclamoCard;
