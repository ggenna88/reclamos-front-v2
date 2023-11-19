import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import EdificiosAll from "./Components/EdificiosAll";
import EdificiosAdd from "./Components/EdificiosAdd";
import NotFound from "./Components/NotFound";
import EdificiosDel from "./Components/EdificiosDel";
import EdificiosUpdate from "./Components/EdificiosUpdate";
import UnidadesAdd from "./Components/UnidadesAdd";
import UnidadesAll from "./Components/UnidadesAll";
import UnidadUpdate from "./Components/UnidadUpdate";
import UsersAdmin from "./Components/UsersAdmin/UsersAdmin";
import GestionReclamos from "./Components/GestionReclamos";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/edificiosall" element={<EdificiosAll />} />
          <Route path="/edificiosadd" element={<EdificiosAdd />} />
          <Route path="/usersall" element={<UsersAdmin />} />
          <Route path="/reclamos" element={<GestionReclamos />} />
          <Route
            path="/edificios-update/:id/:direccion"
            element={<EdificiosUpdate />}
          />
          <Route
            path="/edificios/:edificioId/agregar-unidad"
            element={<UnidadesAdd />}
          />
          <Route
            path="/detalle-unidades/:id/:direccion"
            element={<UnidadesAll />}
          />
          <Route path="/modificar-unidad/:id" element={<UnidadUpdate />} />
          <Route
            path="/eliminar-edificio/:direccion"
            element={<EdificiosDel />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
