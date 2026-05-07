import { useEffect, useState } from 'react';
import { getLugares } from '../services/lugares';
import type { Lugar } from '../types/lugar';
import { Mapa } from '../components/Mapa';

export function Home() {
  const [lugares, setLugares] = useState<Lugar[]>([]);

  useEffect(() => {
    setLugares([
      {
        id: 1,
        nome: 'ESCOLA ELAY3424 ',
        descricao: 'Escola não sei do que',
        statusAcessibilidade: 'ACESSIVEL',
        localizacao: {  
          type: 'Point',
            coordinates: [-51.306651, -26.426072],
        },
        temRampa: true,
        temBanheiroAcessivel: true,
        temElevador: false,
        temPortaLarga: false,
      },
            {
        id: 1,
        nome: 'COMÉRCIO DE PEÇAS MABE ',
        descricao: 'Provavelmente vende peçaj',
        statusAcessibilidade: 'PARCIALMENTE ACESSIVEL',
        localizacao: {  
          type: 'Point',
            coordinates: [-51.30595050181997,-26.424325200966045],
        },
        temRampa: true,
        temBanheiroAcessivel: true,
        temElevador: false,
        temPortaLarga: false,
      },
                  {
        id: 3,
        nome: 'SEBBEN BEM VIVER ',
        descricao: 'Provavelmente vende peçaj',
        statusAcessibilidade: 'ACESSIVEL',
        localizacao: {  
          type: 'Point',
            coordinates: [-51.306546041677315,-26.424730573443192],
        },
        temRampa: true,
        temBanheiroAcessivel: true,
        temElevador: false,
        temPortaLarga: false,
      },
    ]);
  }, []);

  return <Mapa lugares={lugares} />;
}