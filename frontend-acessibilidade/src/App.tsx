import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Perfil } from './pages/Perfil';
import { CadastroLugares } from './pages/CadastroLugares';
import { Login } from './pages/Login';
import { CadastroUsuarios } from './pages/CadastroUsuarios';

function App() {

  const navigate = useNavigate();

  function handleLogin(email: string, senha: string) {

    if (email === 'admin@email.com' && senha === '123456') {
      
      navigate('/home');

    } else {
      alert('Email ou senha inválidos');
    }
  }

  return (
    <Routes>

      <Route
        path="/home"
        element={<Home />}
      />

      <Route
        path="/perfil"
        element={<Perfil />}
      />

      <Route
        path="/"
        element={<Login onLogin={handleLogin} />}
      />

      <Route
        path="/cadastro"
        element={<CadastroLugares />}
      />
      <Route
        path="/usuarios"
        element={<CadastroUsuarios />}
      />

    </Routes>
  );
}

export default App;