import "./App.css";
import RequireAuth from "./Components/requireAuth";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./views/dashboard/dashboard";
import SignIn from "./views/login/signIn";
import Layout from "./Components/layout";
import Usuarios from "./views/usuarios/UsuarioDashboard";
import UsuariosEdificioDashboard from "./views/usuarios/UsuariosEdificioDashboard";
import UsuariosUnidadDashboard from "./views/usuarios/UsuariosUnidadDashboard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          {/*Public Routes*/}
          <Route path="/login" element={<SignIn />} />

          {/*Protected Routes*/}
          <Route element={<RequireAuth />}>
            <Route path="/usuarios" element={<Usuarios />} />
            <Route
              path="/usersaddunidad"
              element={<UsuariosEdificioDashboard />}
            />
            <Route
              path="/usersaddunidades/:id/:direccion"
              element={<UsuariosUnidadDashboard />}
            />
            <Route path="/" element={<Dashboard />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
