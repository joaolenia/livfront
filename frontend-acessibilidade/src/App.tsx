import {
  Routes,
  Route,
  useNavigate
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Perfil } from './pages/Perfil';
import { CadastroLugares } from './pages/CadastroLugares';
import { Login } from './pages/Login';

function App() {

  const navigate = useNavigate();

  function handleLogin(email: string, senha: string) {

    // 🔐 SIMULAÇÃO (depois você pode ligar com backend)
    if (email === 'admin@email.com' && senha === '123456') {
      
      // redireciona pra home
      navigate('/');

    } else {
      alert('Email ou senha inválidos');
    }
  }

  return (
    <Routes>

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/perfil"
        element={<Perfil />}
      />

      <Route
        path="/login"
        element={<Login onLogin={handleLogin} />}
      />

      <Route
        path="/cadastro"
        element={<CadastroLugares />}
      />

    </Routes>
  );
}

export default App;