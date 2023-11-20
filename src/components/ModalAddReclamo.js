import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useAuth from '../hooks/useAuth';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

export default function ModalAddReclamo() {

    const { auth } = useAuth();

    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [tipoReclamo, setTipoReclamo] = useState("");
    const [edificio, setEdificio] = useState("");
    const [imagen, setImagen] = useState("");
    const [userid, setUserId] = useState("");

    const [open, setOpen] = useState(false);

    const [openError, setOpenError] = useState(false);
    const handleOpenError = () => setOpenError(true);
    const handleCloseError = () => setOpenError(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
        setTitulo("");
        setDescripcion("");
        setTipoReclamo("");
        setEdificio("");
        setUserId("");
        setImagen("");
        setOpen(false);
    };

    const handleChange = (e) => {
        setTipoReclamo(e.target.value);
    }

    const handleSubmit = () => {
        handleCreate();
        };

    const handleCreate = async () => {

        const response = await fetch("http://localhost:8080/users/find?user="+auth.username, {
            method: "GET",
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + auth.token,
              "Content-Type": "application/json",
            },
            origin: "http://localhost:3000",
            credentials: "include",
            referrerPolicy: "strict-origin-when-cross-origin",
          });

        const isResponseOk = response?.ok;

        if (isResponseOk) {
            
            const json = await response.json();
            const bodyReclamo = JSON.stringify({titulo,descripcion,"estadoReclamo":"Nuevo",tipoReclamo,"actualizacion":"",edificio,imagen});



            console.log("created successfully", bodyReclamo);
            handleClose();
    
           } else {
            console.log("Error");
            handleOpenError();
           }
    };
    
    return (
        <React.Fragment>
            <Button variant="contained" onClick={handleClickOpen}>
                    Add Reclamo
                </Button>
            <Dialog open={open} onClose={handleClose} fullWidth>
            <DialogTitle>Add Reclamo</DialogTitle>
            <DialogContent>
                <TextField
                autoFocus
                margin="dense"
                id="titulo"
                label="Titulo"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                type="text"
                fullWidth
                variant="standard"
                required
                />
            </DialogContent>
            <DialogContent>
                <TextField
                margin="dense"
                id="descripcion"
                label="Descripcion"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                type="text"
                multiline
                fullWidth
                required
                />
            </DialogContent>
            <DialogContent>
                <TextField
                margin="dense"
                id="imagen"
                label="Imagen"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                type="file"
                fullWidth
                variant="standard"
                required
                />
            </DialogContent>
            <DialogContent>
                <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
                <InputLabel id="role">Tipo de Reclamo</InputLabel>
                <Select
                id="tipoReclamo"
                value={tipoReclamo}
                onChange={handleChange}
                label="tipoReclamo"
                required
                >
                <MenuItem value={"Por Espacio Comun"}>Por Espacio Comun</MenuItem>
                <MenuItem value={"Por Unidad"}>Por Unidad</MenuItem>
                </Select>
            </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Create</Button>
            </DialogActions>
            </Dialog>
            <Modal
                open={openError}
                onClose={handleCloseError}
                >
                <Box sx={{position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,}}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                    Error
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    No se ha podido crear el reclamo
                    </Typography>
                </Box>
            </Modal>
        </React.Fragment>  
    );
}