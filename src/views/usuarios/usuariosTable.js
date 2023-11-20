import { useState, useEffect} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import RefreshIcon from '@mui/icons-material/Refresh';
import useAuth from '../../hooks/useAuth';
import GridUsers from '../../components/UsersList';
import ModalAddUser from '../../components/ModalAddUser';

export default function UsuariosTable() {
    
    const { auth } = useAuth();
    const [usersList, setUsersList] = useState([]);
    const [refresh, setRefresh] = useState(true);
    const [search, setSearch] = useState("");

    useEffect(() => {
        
        const fetchData = async () => {
            const response = await fetch("http://localhost:8080/users/all", {
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
            setUsersList(json);
        }

        fetchData();

    },[refresh]);

    
      const handleRefresh = () => {
        setRefresh(!refresh);
      }

  return (
    <div>
    <Paper sx={{ maxWidth: 936, margin: 'auto', overflow: 'hidden' }}>
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}
      >
        <Toolbar>
          <Grid container spacing={4} alignItems="center">
            <Grid item>
              <SearchIcon color="inherit" sx={{ display: 'block' }} />
            </Grid>
            <Grid item xs>
              <TextField
                fullWidth
                placeholder="Search by username"
                InputProps={{
                  disableUnderline: true,
                  sx: { fontSize: 'default' },
                }}
                variant="standard"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </Grid>
            <Grid item>
              <ModalAddUser/>
              <Tooltip title="Reload">
                <IconButton onClick={handleRefresh}>
                  <RefreshIcon color="inherit" sx={{ display: 'block' }} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      {(usersList.slice(1,).filter(item => (item.username).includes(search.toLowerCase()))).length>0 ?
        <GridUsers userList={usersList.slice(1,).filter(item => (item.username).includes(search.toLowerCase()))}/>
        : (
            <Typography sx={{ my: 5, mx: 2 }} color="text.secondary" align="center">
                No users
            </Typography> 
        )}
    </Paper>
    </div>
  );
}