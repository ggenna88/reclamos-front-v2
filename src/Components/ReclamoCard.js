import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

function ReclamoCard({ reclamo, onEdit, onDelete }) {
  const handleEditClick = () => {
    // Llama a la función de edición pasada como prop
    console.log('Este es el reclamoID',reclamo.reclamo_id)
    onEdit(reclamo.reclamo_id);
  };

  const handleDeleteClick = () => {
    // Llama a la función de eliminación pasada como prop
    console.log('Este es el reclamoID',reclamo.reclamo_id)
    onDelete(reclamo.reclamo_id);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{reclamo.titulo}</Card.Title>
        <Card.Text>{reclamo.descripcion}</Card.Text>
        <Card.Text>Estado: {reclamo.estadoReclamo}</Card.Text>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button variant="primary" onClick={handleEditClick}>
            Editar
          </Button>
          <Button variant="danger" onClick={handleDeleteClick}>
            Eliminar
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ReclamoCard;
