import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Carousel from 'react-bootstrap/Carousel';

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
      <Carousel>
        {reclamo.imagenes && reclamo.imagenes.length > 0 && reclamo.imagenes.map((imagen, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={`data:image/jpeg;base64,${imagen.datosImagen}`} // Asegúrate de que el formato de la imagen sea correcto
              alt={`Imagen ${index + 1}`}
            />
          </Carousel.Item>
        ))}
      </Carousel>
      <Card.Body>
        <Card.Title>{reclamo.titulo}</Card.Title>
        <Card.Text>{reclamo.descripcion}</Card.Text>
        <Card.Text>Estado: {reclamo.estadoReclamo}</Card.Text>
        <Card.Text>Tipo: {reclamo.tipoReclamo}</Card.Text>
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
