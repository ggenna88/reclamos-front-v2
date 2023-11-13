import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import { AuthProvider } from "./Context/AuthContext";
import UsersAll from "./Components/UsersAll";
import { LoginPage } from "./Pages/LoginPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/usersall" element={<UsersAll />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
