import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import UsersAll from "./Components/UsersAll";
import GestionReclamos from "./Components/GestionReclamos";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usersall" element={<UsersAll />} />
          <Route path="/reclamos" element={<GestionReclamos />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
