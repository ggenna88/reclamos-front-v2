import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import UsersAdmin from "./Components/UsersAdmin/UsersAdmin";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usersall" element={<UsersAdmin />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
