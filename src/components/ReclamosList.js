import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

export default function GridReclamos( {reclamoList} ) {
  return (
    <React.Fragment>
      <Title>Ultimos Reclamos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell>Usuario</TableCell>
            <TableCell>Edificio</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Actualizacion</TableCell>
            <TableCell>Estado Reclamo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reclamoList.map((reclamo) => (
            <TableRow key={reclamo.userid}>
              <TableCell>{reclamo.titulo}</TableCell>
              <TableCell>{reclamo.userid}</TableCell>
              <TableCell>{reclamo.edificioid}</TableCell>
              <TableCell>{reclamo.descripcion}</TableCell>
              <TableCell>{reclamo.actualizacion}</TableCell>
              <TableCell>{reclamo.estadoreclamo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}