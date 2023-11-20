import * as React from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

function preventDefault(event) {
  event.preventDefault();
}

export default function ReclamosViewer({cantidadReclamos}) {

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Title>Reclamos Abiertos</Title>
      <Typography component="p" variant="h1">
        {cantidadReclamos}
      </Typography>
      <div>
        <Link color="primary" onClick={() => navigate("/reclamos")}>
          Ver Reclamos
        </Link>
      </div>
    </React.Fragment>
  );
}