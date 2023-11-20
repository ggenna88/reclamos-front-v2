import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import MuiDrawer from '@mui/material/Drawer';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import {useEffect, useState} from 'react';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { MainListItems, SecondaryListItems } from '../../components/listItems';
import useAuth from '../../hooks/useAuth';
import ModalAddReclamo from '../../components/ModalAddReclamo';

const drawerWidth = 240;
const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const defaultTheme = createTheme();

export default function Reclamos() {

    const { auth } = useAuth();
    const [reclamosList, setReclamosList] = useState([]);
    const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
    setOpen(!open);
    };

    useEffect(() =>{

        const fetchData = async () => {
          const response = await fetch("http://localhost:8080/reclamo/all", {
              method: "GET",
              credentials: 'include',
              referrerPolicy: "strict-origin-when-cross-origin",
              headers: {
                  Authorization: "Bearer " + auth.token,
                  "Content-Type": "application/json",
              }
          })
          .catch(error => console.log('Error',error));
    
          const json = await response.json();
          setReclamosList(json);
      }
    
      fetchData();
    
      },[]);

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            {/*Reclamos*/}
                        </Typography>
                        <IconButton color="inherit">
                            <Badge badgeContent={1} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List component="nav">
                        <MainListItems />
                        <Divider sx={{ my: 1 }} />
                        <SecondaryListItems />
                    </List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />
                    <main>
                        {/* Hero unit */}
                        <Box
                            sx={{
                                bgcolor: 'background.paper',
                                pt: 8,
                                pb: 6,
                            }}
                        >
                            <Container maxWidth="sm">
                                <Typography
                                    component="h1"
                                    variant="h2"
                                    align="center"
                                    color="text.primary"
                                    gutterBottom
                                >
                                    Listado de Reclamos
                                </Typography>
                                <Typography variant="h5" align="center" color="text.secondary" paragraph>
                                    Escribir algun texto para mostrar en el menu
                                </Typography>
                                <Stack
                                    sx={{ pt: 4 }}
                                    direction="row"
                                    spacing={2}
                                    justifyContent="center"
                                >
                                    <ModalAddReclamo/>
                                    <Button variant="outlined">Eliminar Reclamo</Button>
                                </Stack>
                            </Container>
                        </Box>
                        <Container sx={{ py: 8 }} maxWidth="md">
                            {/* End hero unit */}
                            <Grid container spacing={4}>
                                {reclamosList.map((card) => (
                                    <Grid item key={card} xs={12} sm={6} md={4}>
                                        <Card
                                            sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                                        >
                                            <CardMedia
                                                component="div"
                                                sx={{
                                                    // 16:9
                                                    pt: '56.25%',
                                                }}
                                                image="https://source.unsplash.com/random?wallpapers"
                                            />
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Typography gutterBottom variant="h5" component="h2">
                                                    Heading
                                                </Typography>
                                                <Typography>
                                                    This is a media card. You can use this section to describe the
                                                    content.
                                                </Typography>
                                            </CardContent>
                                            <CardActions>
                                                <Button size="small">View</Button>
                                                <Button size="small">Edit</Button>
                                                <Button size="small">Errase</Button>
                                            </CardActions>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Container>
                    </main>
                    {/* Footer */}
                    {/*
                    <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
                        <Typography variant="h6" align="center" gutterBottom>
                            Footer
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            align="center"
                            color="text.secondary"
                            component="p"
                        >
                            Something here to give the footer a purpose!
                        </Typography>
                    </Box>*/}
                </Box>
            </Box>
        </ThemeProvider>
    );
}