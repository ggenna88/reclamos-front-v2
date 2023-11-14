import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import UsersAll from "./Components/UsersAll";
import MenuAdmin from "./Components/MenuAdmin";
import AdminUsuarios from "./Components/AdminUsuarios";
import AdminEdificios from "./Components/AdminEdificios";
import AdminReclamos from "./Components/AdminReclamos";
import EdificiosAll from "./Components/EdificiosAll";
import EdificiosAdd from "./Components/EdificiosAdd";
import NotFound from "./Components/NotFound";
import DetalleUnidades from "./Components/DetalleUnidades";
import EdificiosDel from "./Components/EdificiosDel";
// import EdificioUpdate from "./Components/EdificiosUpdate";
import UnidadesAdd from "./Components/UnidadesAdd";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usersall" element={<UsersAll />} />
          <Route path="/edificiosall" element={<EdificiosAll />} />
          <Route path="/edificiosadd" element={<EdificiosAdd />} />
          {/* <Route path="/edificiosupdate" element={<EdificiosUpdate />} /> */}
          <Route path="/edificios/:edificioId/agregar-unidad" element={<UnidadesAdd />} />
          <Route path="/menuadmin" element={<MenuAdmin />} />
          <Route path="/admin-edificio" element={<AdminEdificios />} />
          <Route path="/admin-usuarios" element={<AdminUsuarios />} />
          <Route path="/admin-reclamos" element={<AdminReclamos />} />
          <Route path="/detalle-unidades/:direccion" element={<DetalleUnidades />} />
          <Route path="/eliminar-edificio/:direccion" element={<EdificiosDel />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
