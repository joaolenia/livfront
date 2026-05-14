import {
  Routes,
  Route
} from 'react-router-dom';

import { Home } from './pages/Home';
import { Perfil } from './pages/Perfil';
import { CadastroLugares } from './pages/CadastroLugares';

function App() {

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
        path="/cadastro"
        element={<CadastroLugares />}
      />

    </Routes>

  );
}

export default App;