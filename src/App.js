import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import EdificiosAll from "./Components/EdificiosAll";
import NotFound from "./Components/NotFound";
import EdificiosUpdate from "./Components/EdificiosUpdate";
import UnidadesAll from "./Components/UnidadesAll";
import UsersAdmin from "./Components/UsersAdmin/UsersAdmin";
import GestionReclamos from "./Components/GestionReclamos";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/edificiosall" element={<EdificiosAll />} />
          <Route path="/usersall" element={<UsersAdmin />} />
          <Route path="/reclamos" element={<GestionReclamos />} />
          <Route
            path="/edificios-update/:id/:direccion"
            element={<EdificiosUpdate />}
          />
          <Route
            path="/detalle-unidades/:id/:direccion"
            element={<UnidadesAll />}
          />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
