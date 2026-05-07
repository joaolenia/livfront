import { useEffect, useMemo, useState } from 'react';

import './Home.css';

import type { Lugar } from '../types/lugar';
import { Mapa } from '../components/Mapa';

export function Home() {
  const [lugares, setLugares] = useState<Lugar[]>([]);
  const [busca, setBusca] = useState('');

  useEffect(() => {
    setLugares([
      {
        id: 1,
        nome: 'Café Inclusivo',
        descricao:
          'R. Frei Caneca, 1234 - Consolação',

        statusAcessibilidade:
          'ACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [-51.30595, -26.42432],
        },

        temRampa: true,
        temBanheiroAcessivel: true,
        temElevador: false,
        temPortaLarga: true,
      },

      {
        id: 2,
        nome: 'Mercado Central',
        descricao:
          'Av. Principal, 550',

        statusAcessibilidade:
          'PARCIALMENTE ACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [-51.30654, -26.42473],
        },

        temRampa: true,
        temBanheiroAcessivel: false,
        temElevador: false,
        temPortaLarga: false,
      },

      {
        id: 3,
        nome: 'Loja Antiga',
        descricao:
          'Rua XV, 221',

        statusAcessibilidade:
          'NAO ACESSIVEL',

        localizacao: {
          type: 'Point',
          coordinates: [-51.3078, -26.4255],
        },

        temRampa: false,
        temBanheiroAcessivel: false,
        temElevador: false,
        temPortaLarga: false,
      },
    ]);
  }, []);

  const lugaresFiltrados = useMemo(() => {
    return lugares.filter((lugar) =>
      lugar.nome
        .toLowerCase()
        .includes(busca.toLowerCase())
    );
  }, [lugares, busca]);

  return (
    <div className="home-container">

      <aside className="sidebar">

        <div className="sidebar-top">

          <img
            src="/fundo.png"
            alt="Mapa acessível"
            className="top-image"
          />

        </div>

        <div className="legenda-box">

          <h2>Legenda</h2>

          <div className="legend-card">
            <div className="circle verde">
              ♿
            </div>

            <div>
              <h3>Acessível</h3>

              <p>
                Totalmente acessível
                para cadeirantes
              </p>
            </div>
          </div>

          <div className="legend-card">
            <div className="circle amarelo">
              ♿
            </div>

            <div>
              <h3>
                Parcialmente acessível
              </h3>

              <p>
                Possui algumas barreiras
              </p>
            </div>
          </div>

          <div className="legend-card">
            <div className="circle vermelho">
              ♿
            </div>

            <div>
              <h3>Não acessível</h3>

              <p>
                Possui barreiras de acesso
              </p>
            </div>
          </div>

        </div>
      </aside>

      <main className="map-content">

        <div className="top-search">

          <div className="search-box">
            <span>🔍</span>

            <input
              type="text"
              placeholder="Buscar endereço ou comércio..."
              value={busca}
              onChange={(e) =>
                setBusca(e.target.value)
              }
            />
          </div>

          <button className="filter-btn">
            ☰ Filtros
          </button>
        </div>

        <Mapa lugares={lugaresFiltrados} />
      </main>
    </div>
  );
}