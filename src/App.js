import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import UsersAll from "./Components/UsersAll";
import { LoginPage } from "./Pages/LoginPage";
import { HomePage } from "./Pages/HomePage";
import { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Error404 from "./Pages/ErrorPage";
import { AuthProvider } from "./Context/AuthContext";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route: Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Public Route: Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Route: Your protected component */}
        <Route path="/usersall" element={<UsersAll />} />

        {/* 404 Error Page */}
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
