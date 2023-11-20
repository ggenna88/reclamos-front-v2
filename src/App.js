import './App.css';
import RequireAuth from './components/requireAuth';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './views/dashboard/dashboard';
import SignIn from './views/login/signIn';
import Layout from './components/layout';
import Usuarios from './views/usuarios/UsuarioDashboard';

function App() {
  return (
    <div className="App">
          <Routes>
            <Route path="/" element={<Layout/>}>
              {/*Public Routes*/}
              <Route path="/login" element={<SignIn/>}/>

              {/*Protected Routes*/}
              <Route element={<RequireAuth/>}>
                <Route path="/usuarios" element={<Usuarios/>}/> 
                <Route path="/" element={<Dashboard/>}/>
              </Route>
            </Route>
          </Routes>
    </div>
  );
}

export default App;
