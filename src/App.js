import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import UsersAdmin from "./Components/UsersAdmin/UsersAdmin";
import Reclamo from "./Components/Reclamo";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usersall" element={<UsersAdmin />} />
          <Route path="/reclamo" element={<Reclamo />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
