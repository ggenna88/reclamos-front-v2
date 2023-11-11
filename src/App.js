import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/Login";
import { AuthProvider } from "./Context/AuthContext";
import HomeAdmin from "./Pages/HomeAdmin";
import { UsersAdminProvider } from "./Context/UsersAdmin/UsersAdminProvider";
import { UsersAdmin } from "./Pages/UsersAdmin";

function App() {
  return (
    <Router>
      <AuthProvider>
        <UsersAdminProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/homeAdmin" element={<HomeAdmin />} />

            <Route path="/usersAdmin" element={<UsersAdmin />} />

            <Route path="*" element={"/homeAdmin"}></Route>
          </Routes>
        </UsersAdminProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
