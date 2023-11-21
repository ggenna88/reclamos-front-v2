import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import PeopleIcon from "@mui/icons-material/People";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link, useNavigate } from "react-router-dom";

export function MainListItems() {
  const navigate = useNavigate();

  return (
    <React.Fragment>
      <ListItemButton
        onClick={() => {
          navigate("/");
        }}
      >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/usuarios");
        }}
      >
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Usuarios" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/edificios");
        }}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Edificios" />
      </ListItemButton>
      <ListItemButton
        onClick={() => {
          navigate("/reclamos");
        }}
      >
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Reclamos" />
      </ListItemButton>
    </React.Fragment>
  );
}

export function SecondaryListItems() {
  return (
    <React.Fragment>
      <ListSubheader component="div" inset>
        Administrador
      </ListSubheader>
      <ListItemButton component={Link} to={"/login"}>
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText primary="log Out" />
      </ListItemButton>
      {/*<ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Linea 2" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon>
          <AssignmentIcon />
        </ListItemIcon>
        <ListItemText primary="Linea 3" />
  </ListItemButton>*/}
    </React.Fragment>
  );
}
